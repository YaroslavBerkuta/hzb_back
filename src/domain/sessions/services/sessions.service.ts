import { Inject, Injectable } from '@nestjs/common'
import * as _ from 'lodash'
import { JwtService } from 'src/libs/jwt'
import { REDIS_SERVICE } from 'src/libs/redis/consts'
import { IRedisService } from 'src/libs/redis/interfaces'
import { In, Repository } from 'typeorm'
import { WrongRefreshTokenException } from '../exeptions'
import { SESSION_REPOSITORY } from '../typing/consts'
import { ISession, ISessionsService, IStartSessionPayload } from '../typing/interfaces'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Events } from 'src/shared/enums'
import { UserRole } from 'src/domain/users/typing'
@Injectable()
export class SessionsService implements ISessionsService {
	@Inject(SESSION_REPOSITORY)
	private readonly sessionsRepository: Repository<ISession>

	@Inject(REDIS_SERVICE)
	private readonly redisService: IRedisService

	constructor(
		private readonly jwtService: JwtService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	public async start(payload: IStartSessionPayload) {
		const session: ISession = {
			accessToken: ' ',
			refreshToken: ' ',
			deviceName: payload.deviceName,
			userId: payload.userId,
		}
		const resultInsert = await this.sessionsRepository.insert(session)
		const sessionId = resultInsert.identifiers[0].id

		const tokens = this.generateTokens(payload.userId, payload.role, sessionId)

		await this.sessionsRepository.update(sessionId, tokens)

		return {
			...session,
			...tokens,
		}
	}

	public async getByUserId(userId: number) {
		return await this.sessionsRepository.find({ userId })
	}

	public async refresh(refreshToken: string) {
		let session = await this.sessionsRepository.findOne({ refreshToken })

		if (!session) throw new WrongRefreshTokenException()

		const decoded = this.jwtService.decodeToken(refreshToken)
		const tokens = this.generateTokens(session.userId, decoded.role, session.id)

		session = await this.sessionsRepository.save({
			id: session.id,
			userId: session.userId,
			...tokens,
		})

		return session
	}

	public async checkTokenDeprecation(token: string) {
		const exists = await this.redisService.get(token)

		return Boolean(exists)
	}

	public async closeAllUserSessions(userId: number, execludeIds?: number[]) {
		const query = this.sessionsRepository
			.createQueryBuilder('it')
			.select(['it.id', 'it.accessToken'])
			.where('it.userId = :userId', { userId })

		if (!_.isEmpty(execludeIds)) query.andWhere('it.id <> ANY(:execludeIds)', { execludeIds })

		const sessions = await query.getMany()
		const sessionsIds = _.map(sessions, 'id')

		if (!sessions?.length) return
		await this.sessionsRepository.delete({ id: In(sessionsIds) })
		await Promise.all(sessions.map(async it => await this.storeToken(it.accessToken)))

		this.eventEmitter.emit(Events.StopSessions, {
			userId,
			sessionsIds,
		})
	}

	private async storeToken(token: string) {
		await this.redisService.set(token, 'true', 360)
	}

	private generateTokens(userId: number, role: UserRole, sessionId: number) {
		return {
			accessToken: this.jwtService.createToken({ id: userId, role, sessionId }),
			refreshToken: this.jwtService.createToken({
				id: `_${userId}`,
				role,
				sessionId,
				expiresIn: null,
			}),
		}
	}
}

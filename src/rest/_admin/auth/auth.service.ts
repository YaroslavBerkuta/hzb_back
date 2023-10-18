import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import _ from 'lodash'
import { ISessionsService, SESSIONS_SERVICE } from 'src/domain/sessions/typing'
import {
	IUsersPasswordsService,
	IUsersService,
	USERS_PASSWORDS_SERVICE,
	USERS_SERVICE,
} from 'src/domain/users/typing'

@Injectable()
export class AdminAuthService {
	@Inject(USERS_SERVICE) private readonly usersService: IUsersService
	@Inject(SESSIONS_SERVICE) private readonly sessionsService: ISessionsService
	@Inject(USERS_PASSWORDS_SERVICE) private readonly userPasswordService: IUsersPasswordsService

	public async signIn(dto: any) {
		const user = await this.usersService.getByEmail(dto.email)
		if (!user) throw new NotFoundException('user not found')

		const isCorrect = await this.userPasswordService.compareUserPasswords(user.id, dto.password)
		if (!isCorrect) throw new NotFoundException('password wrong')

		const session = await this.sessionsService.start({
			userId: user.id,
			role: user.role,
			deviceName: dto.deviceName,
		})

		return { accessToken: session.accessToken, refreshToken: session.refreshToken }
	}

	public async refreshToken(dto: any) {
		const sessions = await this.sessionsService.getSessionsByTokens([dto.refreshToken])

		if (sessions.length === 0) throw new Error()

		const user = await this.usersService.getOne(sessions[0].userId)
		if (!user) throw new Error()

		return await this.sessionsService.refresh(dto.refreshToken)
	}
}

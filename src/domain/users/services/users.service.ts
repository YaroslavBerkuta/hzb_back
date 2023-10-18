import { Inject, Injectable } from '@nestjs/common'
import * as _ from 'lodash'
import { FindOneOptions, Repository } from 'typeorm'
import { UserAlreadyExsitExeption, UserNotFoundExeption } from '../exeptions'
import {
	ICheckExistUserPayload,
	IUser,
	IUsersService,
	IUserStorePayload,
	IUserUpdatePayload,
	UserStatus,
} from '../typing'
import { USERS_REPOSITORY } from '../typing/consts'
import { UsersPasswordsService } from './users-passwords.service'

@Injectable()
export class UsersService implements IUsersService {
	@Inject(USERS_REPOSITORY)
	private readonly usersRepository: Repository<IUser>

	constructor(private readonly usersPasswordsService: UsersPasswordsService) {}

	public async store(payload: IUserStorePayload) {
		const exist = await this.checkExist(payload)
		if (exist) throw new UserAlreadyExsitExeption()

		const passwordSalt = this.usersPasswordsService.createUserSalt()
		payload.password = await this.usersPasswordsService.hashPassword(
			payload.password,
			passwordSalt,
		)

		const user = await this.usersRepository.save({
			...payload,
			passwordSalt,
		})

		return user
	}

	public async update(id: number, payload: IUserUpdatePayload) {
		let user = await this.usersRepository.findOne(id)

		user = this.usersRepository.merge(user, _.omitBy(_.omit(payload), _.isNil))

		await this.usersRepository.update(id, user)

		return user
	}

	public async checkExist(payload: ICheckExistUserPayload) {
		const query = this.usersRepository
			.createQueryBuilder('it')
			.where('it.email = :email', { email: payload.email })

		if (payload.username) {
			query.andWhere('it.username = :username', { username: payload.username })

			const user = await query.getOne()
			return Boolean(user)
		}
	}

	public async getByEmail(email: string): Promise<IUser> {
		const user = await this.usersRepository
			.createQueryBuilder('it')
			.where('it.email = :email', { email: email })
			.getOne()

		return user
	}

	public async get(options: FindOneOptions<IUser>): Promise<IUser> {
		if (!options.where) options.where = {}

		options.where['status'] = UserStatus.Active

		return this.usersRepository.findOne(options)
	}

	public async getOne(userId: number): Promise<IUser> {
		const user = await this.usersRepository
			.createQueryBuilder('it')
			.where('it.id = :id', { id: userId })
			.getOne()
		return user
	}
}

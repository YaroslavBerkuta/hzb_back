import { Inject, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import * as randomstring from 'randomstring'
import { Repository } from 'typeorm'
import { UserNotFoundExeption } from '../exeptions'
import { IUser, IUsersPasswordsService } from '../typing'

import { PASSWORD_HASH_SALT, USERS_REPOSITORY } from '../typing/consts'

@Injectable()
export class UsersPasswordsService implements IUsersPasswordsService {
	private readonly saltRounds = 10

	constructor(
		@Inject(PASSWORD_HASH_SALT)
		private localHashSalt: string,
		@Inject(USERS_REPOSITORY)
		private readonly usersRepository: Repository<IUser>,
	) {}

	public async compareUserPasswords(userId: number, password: string) {
		const user = await this.findOneWithPassword(userId)

		return this.comparePass(password, user.passwordSalt, user.password)
	}

	public async changeUserPassword(userId: number, newPassword: string) {
		const user = await this.findOneWithPassword(userId)
		user.password = await this.hashPassword(newPassword, user.passwordSalt)
		await this.usersRepository.save(user)
	}

	private async findOneWithPassword(userId: number) {
		const user = await this.usersRepository.findOne({
			where: { id: userId },
			select: ['id', 'password', 'passwordSalt'],
		})

		if (!user) throw new UserNotFoundExeption()

		return user
	}

	public async hashPassword(password: string, salt: string): Promise<string> {
		return bcrypt.hash(this.getSalt(salt) + password, this.saltRounds)
	}

	private async comparePass(password: string, salt: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(this.getSalt(salt) + password, hash)
	}

	public createUserSalt(): string {
		return randomstring.generate(10)
	}

	private getSalt(userSalt: string): string {
		return this.localHashSalt + userSalt
	}
}

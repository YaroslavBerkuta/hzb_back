import { Inject, Injectable } from '@nestjs/common'
import { Seeder } from 'src/shared'
import {
	IUsersRepository,
	IUsersService,
	USERS_REPOSITORY,
	USERS_SERVICE,
	UserRole,
} from '../typing'

@Injectable()
export class UserSeed extends Seeder {
	@Inject(USERS_SERVICE) private readonly userService: IUsersService
	@Inject(USERS_REPOSITORY) private readonly userRepository: IUsersRepository
	protected name = 'Users'
	protected async seed(): Promise<void> {
		try {
			const exist = await this.userRepository.find({ where: { email: 'admin@admin.com' } })
			if (exist) {
				return
			}
			await this.userService.store({
				username: 'Admin',
				email: 'admin@admin.com',
				password: '123qqq',
				role: UserRole.Admin,
			})
		} catch (error) {
			console.log(error)
		}
	}
}

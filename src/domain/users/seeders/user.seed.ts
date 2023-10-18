import { Inject, Injectable } from '@nestjs/common'
import { Seeder } from 'src/shared'
import { IUsersService, USERS_SERVICE, UserRole } from '../typing'

@Injectable()
export class UserSeed extends Seeder {
	@Inject(USERS_SERVICE) private readonly userService: IUsersService
	protected name = 'Users'
	protected async seed(): Promise<void> {
		try {
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

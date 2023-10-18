import { Inject, Injectable } from '@nestjs/common'
import { IUsersService, USERS_SERVICE } from 'src/domain/users/typing'

@Injectable()
export class AdminAccountService {
	@Inject(USERS_SERVICE) private readonly userService: IUsersService

	async getAccount(userId: number) {
		const user = await this.userService.getOne(userId)

		return user
	}
}

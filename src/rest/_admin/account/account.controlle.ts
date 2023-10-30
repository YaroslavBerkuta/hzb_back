import { Controller, Get } from '@nestjs/common'
import { AuthGuard } from 'src/domain/sessions/decorators'
import { ReqUser } from 'src/shared'
import { AdminAccountService } from './account.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('ADMIN | ACCOUNT')
@Controller('admin/account')
export class AdminAccountController {
	constructor(private readonly accountServide: AdminAccountService) {}

	@AuthGuard()
	@Get()
	getAccount(@ReqUser() userId: number) {
		return this.accountServide.getAccount(userId)
	}
}

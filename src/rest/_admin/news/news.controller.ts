import { Controller, Get } from '@nestjs/common'
import { RoleGuard } from 'src/domain/sessions/decorators'
import { UserRole } from 'src/domain/users/typing'
import { AdminNewsService } from './news.service'
import { IPagination, ReqPagination } from 'src/shared'

@Controller('admin/news')
export class AdminNewsController {
	constructor(private readonly newsService: AdminNewsService) {}

	@RoleGuard(UserRole.Admin)
	@Get('list')
	getList(@ReqPagination() pagination: IPagination) {
		return this.newsService.getList(pagination)
	}
}

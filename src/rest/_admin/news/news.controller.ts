import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { RoleGuard } from 'src/domain/sessions/decorators'
import { UserRole } from 'src/domain/users/typing'
import { AdminNewsService } from './news.service'
import { IPagination, ReqPagination } from 'src/shared'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('ADMIN | NEWS')
@Controller('admin/news')
export class AdminNewsController {
	constructor(private readonly newsService: AdminNewsService) {}

	@RoleGuard(UserRole.Admin)
	@Get('list')
	getList(@ReqPagination() pagination: IPagination) {
		return this.newsService.getList(pagination)
	}

	@RoleGuard(UserRole.Admin)
	@Post('create')
	store(@Body() dto: any) {
		return this.newsService.store(dto)
	}

	@RoleGuard(UserRole.Admin)
	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.newsService.delete(id)
	}

	@RoleGuard(UserRole.Admin)
	@Patch(':id')
	update(@Param('id') id: number, @Body() dto: any) {
		return this.newsService.update(id, dto)
	}
}

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { AdminPartnerService } from './partner.service'
import { RoleGuard } from 'src/domain/sessions/decorators'
import { UserRole } from 'src/domain/users/typing'
import { IPagination, ReqPagination } from 'src/shared'

@Controller('admin/partner')
export class AdminPartnerController {
	constructor(private readonly partnerService: AdminPartnerService) {}

	@RoleGuard(UserRole.Admin)
	@Get('list')
	getList(@ReqPagination() pagination: IPagination) {
		return this.partnerService.getList(pagination)
	}

	@RoleGuard(UserRole.Admin)
	@Post('create')
	store(@Body() dto: any) {
		return this.partnerService.store(dto)
	}

	@RoleGuard(UserRole.Admin)
	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.partnerService.delete(id)
	}

	@RoleGuard(UserRole.Admin)
	@Patch(':id')
	update(@Param('id') id: number, @Body() dto: any) {
		return this.partnerService.update(id, dto)
	}
}

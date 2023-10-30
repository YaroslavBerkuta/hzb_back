import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { AdminDistributorsService } from './distributors.service'
import { IPagination, ReqPagination } from 'src/shared'

@Controller('admin/distributors')
export class AdminDistributorsController {
	constructor(private readonly distributorService: AdminDistributorsService) {}

	@Get()
	getList(@ReqPagination() pagination: IPagination) {
		return this.distributorService.getList(pagination)
	}

	@Post()
	create(@Body() dto: any) {
		return this.distributorService.create(dto)
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.distributorService.remove(id)
	}
}

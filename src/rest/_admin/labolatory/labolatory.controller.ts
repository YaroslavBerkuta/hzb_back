import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { AdminLabolatoryService } from './labolatory.service'
import { IPagination, ReqPagination } from 'src/shared'

@Controller('admin/labolatory')
export class AdminLabolatoryController {
	constructor(private readonly labolatoryService: AdminLabolatoryService) {}

	@Get()
	getList(@ReqPagination() pagination: IPagination) {
		return this.labolatoryService.getList(pagination)
	}

    @Post()
	create(@Body() dto: any) {
		return this.labolatoryService.create(dto)
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.labolatoryService.remove(id)
	}
}

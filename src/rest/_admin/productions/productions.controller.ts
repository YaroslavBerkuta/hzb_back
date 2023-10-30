import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { AdminProductionsService } from './productions.service'
import { IPagination, ReqPagination } from 'src/shared'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('ADMIN | PRODUCTIONS')
@Controller('admin/productions')
export class AdminProductionsController {
	constructor(private readonly productionService: AdminProductionsService) {}

	@Get()
	getList(@ReqPagination() pagination: IPagination) {
		return this.productionService.getList(pagination)
	}

	@Post()
	create(@Body() dto: any) {
		return this.productionService.store(dto)
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.productionService.delete(id)
	}
}

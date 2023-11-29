import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { AdminQualityService } from './quality.service'
import { IPagination, ReqPagination } from 'src/shared'

@Controller('admin/quality')
export class AdminQualityController {
	constructor(private readonly qualityService: AdminQualityService) {}

	@Get('')
	getList(@ReqPagination() pagination: IPagination) {
		return this.qualityService.getList(pagination)
	}

	@Post()
	create(@Body() dto: any) {
		return this.qualityService.create(dto)
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.qualityService.remove(id)
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() dto: any) {
		return this.qualityService.update(id, dto)
	}
}

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { AdminAwardsService } from './awards.service'
import { IPagination, ReqPagination } from 'src/shared'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { CreateAwardsDto } from './dto/index'

@ApiTags('ADMIN | AWARDS')
@Controller('admin/awards')
export class AdminAwardsController {
	constructor(private readonly awardsService: AdminAwardsService) {}

	@Get()
	getList(@ReqPagination() pagination: IPagination) {
		return this.awardsService.getList(pagination)
	}

	@ApiBody({
		type: CreateAwardsDto,
	})
	@Post()
	create(@Body() dto: CreateAwardsDto) {
		return this.awardsService.create(dto)
	}

	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.awardsService.delete(id)
	}
}

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { AdminFeedbacksService } from './feedbacks.service'
import { IPagination, ReqPagination } from 'src/shared'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('ADMIN | FEEDBACKS')
@Controller('admin/feedbacks')
export class AdminFeedbacksController {
	constructor(private readonly feedbacksService: AdminFeedbacksService) {}

	@Get()
	getList(@ReqPagination() pagination: IPagination) {
		return this.feedbacksService.getList(pagination)
	}

	@Post()
	create(@Body() dto: any) {
		return this.feedbacksService.create(dto)
	}

	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.feedbacksService.delete(id)
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() dto: any) {
		return this.feedbacksService.update(id, dto)
	}
}

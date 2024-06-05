import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { PublicFeedbacksService } from './feedbacks.service'
import { ApiTags } from '@nestjs/swagger'
import { ApiImplictPagination, IPagination, ReqPagination } from 'src/shared'

@ApiTags('PUBLIC | FEEDBACKS')
@Controller('public/feedbacks')
export class PublicFeedbacksController {
	constructor(public readonly feedbacksService: PublicFeedbacksService) {}

	@ApiImplictPagination()
	@Get()
	getList(@ReqPagination() pagination: IPagination) {
		return this.feedbacksService.getList(pagination)
	}

	@Post()
	create(@Body() dto: any) {
		return this.feedbacksService.create(dto)
	}
}
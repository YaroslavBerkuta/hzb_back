import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { PublicLabolatoryService } from './labolatory.service'
import { IPagination, ReqPagination } from 'src/shared'

@Controller('public/labolatory')
export class PublicLabolatoryController {
	constructor(private readonly labolatoryService: PublicLabolatoryService) {}

	@Get()
	getList(@ReqPagination() pagination: IPagination) {
		return this.labolatoryService.getList(pagination)
	}
}

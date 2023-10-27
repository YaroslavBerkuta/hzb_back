import { Controller, Get } from '@nestjs/common'
import { AdminAwardsService } from './awards.service'
import { IPagination, ReqPagination } from 'src/shared'

@Controller('admin/awards')
export class AdminAwardsController {
	constructor(private readonly awardsService: AdminAwardsService) {}

	@Get()
	getList(@ReqPagination() pagination: IPagination) {
		return this.awardsService.getList(pagination)
	}
}

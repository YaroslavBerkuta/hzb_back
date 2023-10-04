import { Controller, Get } from '@nestjs/common'
import { PublicAwardsService } from './awards.service'
import { ApiTags } from '@nestjs/swagger'
import { ApiImplictPagination, IPagination, ReqPagination } from 'src/shared'

@ApiTags('PUBLIC | AWARDS')
@Controller('public/awards')
export class PublicAwardsController {
	constructor(public readonly awardsService: PublicAwardsService) {}

	@ApiImplictPagination()
	@Get()
	getList(@ReqPagination() pagination: IPagination) {
		return this.awardsService.getList(pagination)
	}
}

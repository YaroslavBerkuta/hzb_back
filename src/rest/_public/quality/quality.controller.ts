import { PublicQualityService } from './quality.service'
import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiImplictPagination, IPagination, ReqPagination } from 'src/shared'

@ApiTags('PUBLIC | QUALITY')
@Controller('public/quality')
export class PublicQualityController {
	constructor(private readonly qualityService: PublicQualityService) {}

	@ApiImplictPagination()
	@Get()
	getList(@ReqPagination() pagination: IPagination) {
		return this.qualityService.getList(pagination)
	}
}

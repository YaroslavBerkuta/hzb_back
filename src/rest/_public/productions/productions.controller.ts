import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { PublicProductionsService } from './productions.service'
import { ApiImplictPagination, IPagination, ReqPagination } from 'src/shared'

@ApiTags('PUBLIC | PRODUCTIONS')
@Controller('public/productions')
export class PublicProductionsController {
	constructor(private readonly productionsService: PublicProductionsService) {}

	@ApiImplictPagination()
	@Get('')
	getList(@ReqPagination() pagination: IPagination) {
		return this.productionsService.getList(pagination)
	}
}

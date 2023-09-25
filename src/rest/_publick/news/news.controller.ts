import { ReqPagination } from './../../../shared/decorators/req-pagination.decorator'
import { Controller, Get } from '@nestjs/common'
import { PublickNewsService } from './news.service'
import { ApiImplictPagination, IPagination } from 'src/shared'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('PUBLICK | NEWS')
@Controller('publick/news')
export class PublickNewsController {
	constructor(private readonly newsService: PublickNewsService) {}

	@ApiImplictPagination()
	@Get()
	getList(@ReqPagination() pagination: IPagination) {
		return this.newsService.getList(pagination)
	}
}

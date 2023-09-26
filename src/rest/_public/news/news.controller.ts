import { ReqPagination } from '../../../shared/decorators/req-pagination.decorator'
import { Controller, Get } from '@nestjs/common'
import { PublicNewsService } from './news.service'
import { ApiImplictPagination, IPagination } from 'src/shared'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('PUBLIC | NEWS')
@Controller('public/news')
export class PublicNewsController {
	constructor(private readonly newsService: PublicNewsService) {}

	@ApiImplictPagination()
	@Get()
	getList(@ReqPagination() pagination: IPagination) {
		return this.newsService.getList(pagination)
	}
}

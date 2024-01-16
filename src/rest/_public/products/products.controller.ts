import { Controller, Get, Param } from '@nestjs/common'
import { PublicProductsService } from './products.service'
import { IPagination, ReqPagination } from 'src/shared'

@Controller('public/products')
export class PublicProductsController {
	constructor(private readonly productsService: PublicProductsService) {}

	@Get('list')
	getList(@ReqPagination() pagination: IPagination) {
		return this.productsService.getList(pagination)
	}

	@Get(':id')
	detail(@Param('id') id: number) {
		return this.productsService.detail(id)
	}
}

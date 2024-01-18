import { Controller, Get, Param, Query } from '@nestjs/common'
import { PublicProductsService } from './products.service'
import { IPagination, ReqPagination } from 'src/shared'

@Controller('public/products')
export class PublicProductsController {
	constructor(private readonly productsService: PublicProductsService) {}

	@Get('list')
	getList(@ReqPagination() pagination: IPagination, @Query() dto: any) {
		return this.productsService.getList(pagination, dto)
	}

	@Get(':id')
	detail(@Param('id') id: number) {
		return this.productsService.detail(id)
	}
}

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { AdminProductsService } from './products.service'
import { IPagination, ReqPagination } from 'src/shared'

@Controller('admin/products')
export class AdminProductsController {
	constructor(private readonly productsService: AdminProductsService) {}

	@Get('categories')
	getCategories() {
		return this.productsService.getCategories()
	}

	@Get('list')
	getList(@ReqPagination() pagination: IPagination) {
		return this.productsService.getList(pagination)
	}

	@Post()
	create(@Body() dto: any) {
		return this.productsService.create(dto)
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.productsService.remove(id)
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() dto: any) {
		return this.productsService.update(id, dto)
	}
}

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { AdminCategoryService } from './categories.service'
import { IPagination, ReqPagination } from 'src/shared'

@Controller('admin/category')
export class AdminCategoryController {
	constructor(private readonly categoryService: AdminCategoryService) {}

	@Get('')
	getList(@ReqPagination() pagination: IPagination) {
		return this.categoryService.getList(pagination)
	}

	@Post('')
	create(@Body() dto: any) {
		return this.categoryService.create(dto)
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.categoryService.remove(id)
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() dto: any) {
		return this.categoryService.update(id, dto)
	}
}

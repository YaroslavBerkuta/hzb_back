import { Controller, Get, Param } from '@nestjs/common'
import { PublicCategoriesService } from './categories.service'

@Controller('public/categories')
export class PublicCategoriesController {
	constructor(public readonly categoriesService: PublicCategoriesService) {}

	@Get('/subcategory/:key')
	getSubcategory(@Param('key') key: string) {
		return this.categoriesService.getSubCategoies(key)
	}
}

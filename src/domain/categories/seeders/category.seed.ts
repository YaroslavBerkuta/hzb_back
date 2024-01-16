import { Inject, Injectable } from '@nestjs/common'
import { Seeder } from 'src/shared'
import { CATEGORY_REPOSITORY, CATEGORY_SERVICE, ICategoryServices, TCategory } from '../typing'
import { CategoryData } from './data'

@Injectable()
export class CatgorySeed extends Seeder {
	@Inject(CATEGORY_SERVICE) private readonly categoryService: ICategoryServices
	@Inject(CATEGORY_REPOSITORY) private readonly categoryRepository: TCategory
	protected name = 'Category'
	protected async seed(): Promise<void> {
		try {
			for await (let it of CategoryData) {
				let exist = await this.categoryRepository.findOne({ where: { key: it.key } })
				if (exist) {
					continue
				}
				this.categoryService.create(it)
			}
		} catch (error) {
			console.log('category seed error:', error)
		}
	}
}

import { Inject, Injectable } from '@nestjs/common'
import { CATEGORY_REPOSITORY, TCategory } from 'src/domain/categories/typing'

@Injectable()
export class PublicCategoriesService {
	@Inject(CATEGORY_REPOSITORY) private readonly categoriesRepository: TCategory

	async getSubCategoies(key: string) {
		try {
			const parent = await this.categoriesRepository.findOne({ where: { key } })

			const children = await this.categoriesRepository
				.createQueryBuilder('it')
				.leftJoinAndSelect('it.translations', 'translations')
				.where('it.parentId = :id', { id: parent.id })
				.getMany()

			return children
		} catch (error) {
			console.log('error:', error)
		}
	}
}

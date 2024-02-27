import { Inject, Injectable } from '@nestjs/common'
import { CATEGORY_REPOSITORY, TCategory } from 'src/domain/categories/typing'
import { GALLERY_SERVICE } from 'src/domain/galleries/consts'
import { IGalleryService } from 'src/domain/galleries/interface'

@Injectable()
export class PublicCategoriesService {
	@Inject(CATEGORY_REPOSITORY) private readonly categoriesRepository: TCategory
	@Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService

	async getSubCategoies(key: string) {
		try {
			const parent = await this.categoriesRepository.findOne({ where: { key } })

			const children = await this.categoriesRepository
				.createQueryBuilder('it')
				.leftJoinAndSelect('it.translations', 'translations')
				.where('it.parentId = :id', { id: parent.id })
				.getMany()

			await Promise.all(
				children.map(async (it, index, arr: any) => {
					arr[index].cover =
						(await this.galleryService.get({
							parentId: it.id,
							parentTable: 'categoryCover',
						})) || ''

					arr[index].price =
						(await this.galleryService.get({
							parentId: it.id,
							parentTable: 'categoryPrice',
						})) || ''

					arr[index].catalog =
						(await this.galleryService.get({
							parentId: it.id,
							parentTable: 'categoryCatalog',
						})) || ''
				}),
			)

			return children
		} catch (error) {
			console.log('error:', error)
		}
	}
	async getCatalog(key: string) {
		const category = await this.categoriesRepository.findOne({ where: { key } })
		
			const price = await this.galleryService.get({
				parentId: category.id,
				parentTable:'categoryPrice'
			})

			const catalog = (await this.galleryService.get({
				parentId: category.id,
				parentTable:'categoryCatalog'
			}))
		return {
				price:price[0] || null,
				catalog:catalog[0]||null
			}
	}
}

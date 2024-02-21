import { Inject, Injectable } from '@nestjs/common'
import {
	CATEGORY_REPOSITORY,
	CATEGORY_SERVICE,
	ICategoryServices,
	TCategory,
} from 'src/domain/categories/typing'
import { GALLERY_SERVICE } from 'src/domain/galleries/consts'
import { IGalleryService } from 'src/domain/galleries/interface'
import { IPagination, paginateAndGetMany } from 'src/shared'

@Injectable()
export class AdminCategoryService {
	@Inject(CATEGORY_SERVICE) private readonly categoryService: ICategoryServices
	@Inject(CATEGORY_REPOSITORY) private readonly categoryRepository: TCategory
	@Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService

	public async getList(pagination: IPagination) {
		try {
			const query = this.categoryRepository
				.createQueryBuilder('it')
				.leftJoinAndSelect('it.translations', 'translations')
				.orderBy('it.createdAt', 'DESC')
			const { items, count } = await paginateAndGetMany(query, pagination, 'it')

			await Promise.all(
				items.map(async (it, index, arr: any) => {
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

			return { items, count }
		} catch (error) {
			console.log('error:', error)
		}
	}

	public async create(dto: any) {
		try {
			return await this.categoryService.create(dto)
		} catch (error) {
			console.log('error:', error)
		}
	}

	public async remove(id: number) {
		return await this.categoryRepository.delete({ id })
	}

	public async update(id: number, dto: any) {
		return await this.categoryService.update(id, dto)
	}
}

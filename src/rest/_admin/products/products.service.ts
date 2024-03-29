import { Inject, Injectable } from '@nestjs/common'
import { CATEGORY_REPOSITORY, TCategory } from 'src/domain/categories/typing'
import { GALLERY_SERVICE } from 'src/domain/galleries/consts'
import { IGalleryService } from 'src/domain/galleries/interface'
import { TProductionRepository } from 'src/domain/productions/typing'
import { IProductService } from 'src/domain/products/typing'
import { PRODUCTS_REPOSITORY, PRODUCTS_SERVICE } from 'src/domain/products/typing/consts'
import { IPagination, paginateAndGetMany } from 'src/shared'

@Injectable()
export class AdminProductsService {
	@Inject(PRODUCTS_SERVICE) private readonly productService: IProductService
	@Inject(PRODUCTS_REPOSITORY) private readonly productRepository: TProductionRepository
	@Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService
	@Inject(CATEGORY_REPOSITORY) private readonly categoriesRepository: TCategory

	async create(dto: any) {
		try {
			const product = await this.productService.create(dto)
			return product
		} catch (error) {
			console.log(error)
		}
	}

	async update(id: number, dto: any) {
		try {
			return await this.productService.update(id, dto)
		} catch (error) {
			console.log(error)
		}
	}

	async getList(pagination: IPagination) {
		try {
			const query = this.productRepository
				.createQueryBuilder('it')
				.leftJoinAndSelect('it.translations', 'translations')
				.leftJoinAndSelect('it.productCategory', 'productCategory')
				.leftJoinAndSelect('productCategory.category', 'category')

			const { items, count } = await paginateAndGetMany(query, pagination, 'it')

			await Promise.all(
				items.map(async (it, index, arr: any) => {
					arr[index].cover =
						(await this.galleryService.get({
							parentId: it.id,
							parentTable: 'products',
						})) || ''
				}),
			)

			await Promise.all(
				items.map(async (it, index, arr: any) => {
					arr[index].table =
						(await this.galleryService.get({
							parentId: it.id,
							parentTable: 'productsTable',
						})) || ''
				}),
			)

			return {
				items,
				count,
			}
		} catch (error) {
			console.log(error)
		}
	}

	async remove(id: number) {
		return this.productRepository.delete(id)
	}

	async getCategories() {
		try {
			const data = await this.categoriesRepository
				.createQueryBuilder('it')
				.leftJoinAndSelect('it.translations', 'translations')
				.getMany()
			return data
		} catch (error) {
			console.log(error)
		}
	}
}

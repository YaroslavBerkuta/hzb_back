import { Inject, Injectable } from '@nestjs/common'
import { GALLERY_SERVICE } from 'src/domain/galleries/consts'
import { IGalleryService } from 'src/domain/galleries/interface'
import { TProductionRepository } from 'src/domain/productions/typing'
import { PRODUCTS_REPOSITORY } from 'src/domain/products/typing/consts'
import { IPagination, paginateAndGetMany } from 'src/shared'

@Injectable()
export class PublicProductsService {
	@Inject(PRODUCTS_REPOSITORY) private readonly productRepository: TProductionRepository
	@Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService

	async getList(pagination: IPagination) {
		try {
			const query = this.productRepository
				.createQueryBuilder('it')
				.leftJoinAndSelect('it.translations', 'translations')

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

			return {
				items,
				count,
			}
		} catch (error) {
			console.log(error)
		}
	}

	async detail(id: number) {
		try {
			const product = await this.productRepository
				.createQueryBuilder('it')
				.leftJoinAndSelect('it.translations', 'translations')
				.where('it.id = :id', { id })
				.getOne()
			const gallery = await this.galleryService.get({
				parentId: product.id,
				parentTable: 'products',
			})
			const table = await this.galleryService.get({
				parentId: product.id,
				parentTable: 'productsTable',
			})

			return { ...product, gallery, table }
		} catch (error) {
			console.log(error)
		}
	}
}

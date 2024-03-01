import { ForbiddenException, Inject, Injectable } from '@nestjs/common'
import { CATEGORY_REPOSITORY, TCategory } from 'src/domain/categories/typing'
import { GALLERY_SERVICE } from 'src/domain/galleries/consts'
import { IGalleryService } from 'src/domain/galleries/interface'
import { TProductionRepository } from 'src/domain/productions/typing'
import { PRODUCTS_REPOSITORY } from 'src/domain/products/typing/consts'
import { IPagination, paginateAndGetMany } from 'src/shared'
import { Lang } from 'src/shared/enums'
import { Brackets } from 'typeorm'

@Injectable()
export class PublicProductsService {
	@Inject(PRODUCTS_REPOSITORY) private readonly productRepository: TProductionRepository
	@Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService
	@Inject(CATEGORY_REPOSITORY) private readonly categoryRepository: TCategory

	async getList(pagination: IPagination, dto: any) {
		console.log('dto:', dto)
		try {
			const category = await this.categoryRepository.findOne({
				where: { key: dto.categoryKey },
			})

			const query = this.productRepository
				.createQueryBuilder('it')
				.leftJoinAndSelect('it.translations', 'translations')
				.leftJoinAndSelect('it.productCategory', 'productCategory')
				.leftJoinAndSelect('productCategory.category', 'category')
				.andWhere('productCategory.categoryId = :categoryId', {
					categoryId: category.id,
				})
				.orWhere('category.parentId = :categoryId', {
					categoryId: category.id,
				})

			if (pagination.sort) {
				query
					.andWhere(
						new Brackets(sub => {
							sub.where('translations.lang = :lang', { lang: Lang.ua })
						}),
					)
					.orderBy('translations.name', pagination.sort)
			}

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

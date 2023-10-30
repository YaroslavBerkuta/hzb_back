import { Inject, Injectable } from '@nestjs/common'
import { GALLERY_SERVICE } from 'src/domain/galleries/consts'
import { IGalleryService } from 'src/domain/galleries/interface'
import { PRODUCTIONS_REPOSITORY, TProductionRepository } from 'src/domain/productions/typing'
import { IPagination, paginateAndGetMany } from 'src/shared'

@Injectable()
export class PublicProductionsService {
	@Inject(PRODUCTIONS_REPOSITORY) private readonly productionsRepository: TProductionRepository
	@Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService

	async getList(pagination: IPagination) {
		try {
			const query = this.productionsRepository
				.createQueryBuilder('it')
				.leftJoinAndSelect('it.translations', 'translations')
				.orderBy('it.createdAt', 'DESC')

			const { items, count } = await paginateAndGetMany(query, pagination, 'it')

			await Promise.all(
				items.map(async (it, index, arr: any) => {
					arr[index].cover =
						(await this.galleryService.get({
							parentId: it.id,
							parentTable: 'productions',
						})) || ''
				}),
			)
			return {
				items,
				count,
			}
		} catch (error) {
			console.log('error:', error)
		}
	}
}

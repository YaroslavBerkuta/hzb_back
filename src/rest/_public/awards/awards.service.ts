import { Inject, Injectable } from '@nestjs/common'
import { AWARDS_REPOSITORIES, TAwardsRepository } from 'src/domain/awards/typing'
import { GALLERY_SERVICE } from 'src/domain/galleries/consts'
import { IGalleryService } from 'src/domain/galleries/interface'
import { IPagination, paginateAndGetMany } from 'src/shared'

@Injectable()
export class PublicAwardsService {
	@Inject(AWARDS_REPOSITORIES) private readonly awardsRepository: TAwardsRepository
	@Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService

	async getList(pagination: IPagination) {
		try {
			const query = this.awardsRepository
				.createQueryBuilder('it')
				.leftJoinAndSelect('it.translations', 'translations')
				.orderBy('it.createdAt', 'DESC')

			const { items, count } = await paginateAndGetMany(query, pagination, 'it')

			await Promise.all(
				items.map(async (it, index, arr: any) => {
					arr[index].cover =
						(await this.galleryService.get({
							parentId: it.id,
							parentTable: 'awards',
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

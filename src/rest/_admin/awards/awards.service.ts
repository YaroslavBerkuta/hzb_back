import { Inject, Injectable } from '@nestjs/common'
import {
	AWARDS_REPOSITORIES,
	AWARDS_SERVICE,
	IAwardsService,
	TAwardsRepository,
} from 'src/domain/awards/typing'
import { GALLERY_SERVICE } from 'src/domain/galleries/consts'
import { IGalleryService } from 'src/domain/galleries/interface'
import { IPagination, paginateAndGetMany } from 'src/shared'

@Injectable()
export class AdminAwardsService {
	@Inject(AWARDS_REPOSITORIES) private readonly awardsRepository: TAwardsRepository
	@Inject(AWARDS_SERVICE) private readonly awardsService: IAwardsService
	@Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService

	async getList(pagination: IPagination) {
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
	}

	async create(dto: any) {
		return await this.awardsService.create(dto)
	}

	async delete(id: number) {
		try {
			await this.awardsRepository.delete(id)
		} catch (error) {}
	}
}

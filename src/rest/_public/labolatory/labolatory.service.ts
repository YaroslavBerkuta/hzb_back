import { Inject, Injectable } from '@nestjs/common'
import { GALLERY_SERVICE } from 'src/domain/galleries/consts'
import { IGalleryService } from 'src/domain/galleries/interface'
import {
	LABOLATORY_REPOSITORY,
	TLabolatoryRepository,
} from 'src/domain/labolatory/typing'
import { IPagination, paginateAndGetMany } from 'src/shared'

@Injectable()
export class PublicLabolatoryService {
	@Inject(LABOLATORY_REPOSITORY) private readonly labolatoryRepository: TLabolatoryRepository
	@Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService

	async getList(pagination: IPagination) {
		const query = this.labolatoryRepository
			.createQueryBuilder('it')
			.leftJoinAndSelect('it.translations', 'translations')
			.orderBy('it.createdAt', 'DESC')

		const { items, count } = await paginateAndGetMany(query, pagination, 'it')

		await Promise.all(
			items.map(async (it, index, arr: any) => {
				arr[index].cover =
					(await this.galleryService.get({
						parentId: it.id,
						parentTable: 'labolatory',
					})) || ''
			}),
		)
		return {
			items,
			count,
		}
	}
}

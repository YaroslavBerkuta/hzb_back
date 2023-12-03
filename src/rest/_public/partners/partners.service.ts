import { Inject, Injectable } from '@nestjs/common'
import { GALLERY_SERVICE } from 'src/domain/galleries/consts'
import { IGalleryService } from 'src/domain/galleries/interface'
import { PARTNER_REPOSITORY, TPartnerRepository } from 'src/domain/partner/types'
import { IPagination, paginateAndGetMany } from 'src/shared'

@Injectable()
export class PublicPartnerService {
	@Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService
	@Inject(PARTNER_REPOSITORY) private readonly partnerRepository: TPartnerRepository

	async getList(pagination: IPagination) {
		const query = this.partnerRepository
			.createQueryBuilder('it')
			.leftJoinAndSelect('it.translations', 'translations')
			.orderBy('it.createdAt', 'DESC')
		const { items, count } = await paginateAndGetMany(query, pagination, 'it')
		await Promise.all(
			items.map(async (it, index, arr: any) => {
				arr[index].cover =
					(await this.galleryService.get({
						parentId: it.id,
						parentTable: 'partner',
					})) || ''
			}),
		)
		return {
			items,
			count,
		}
	}
}

import { Inject, Injectable } from '@nestjs/common'
import { GALLERY_SERVICE } from 'src/domain/galleries/consts'
import { IGalleryService } from 'src/domain/galleries/interface'
import { QUALITY_REPOSITORY, TQualityRepository } from 'src/domain/quality/typing'
import { IPagination, paginateAndGetMany } from 'src/shared'

@Injectable()
export class PublicQualityService {
	@Inject(QUALITY_REPOSITORY) private readonly qualityRepository: TQualityRepository
	@Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService

	async getList(pagination: IPagination) {
		try {
			const query = this.qualityRepository
				.createQueryBuilder('it')
				.leftJoinAndSelect('it.translations', 'translations')
			const { items, count } = await paginateAndGetMany(query, pagination, 'it')
			await Promise.all(
				items.map(async (it, index, arr: any) => {
					arr[index].cover =
						(await this.galleryService.get({
							parentId: it.id,
							parentTable: 'quality',
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

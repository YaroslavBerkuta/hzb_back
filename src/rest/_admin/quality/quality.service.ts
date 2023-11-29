import { Inject, Injectable } from '@nestjs/common'
import { GALLERY_SERVICE } from 'src/domain/galleries/consts'
import { IGalleryService } from 'src/domain/galleries/interface'
import {
	IQualityService,
	QUALITY_REPOSITORY,
	QUALITY_SERVICE,
	TQualityRepository,
} from 'src/domain/quality/typing'
import { IPagination, paginateAndGetMany } from 'src/shared'

@Injectable()
export class AdminQualityService {
	@Inject(QUALITY_REPOSITORY) private readonly qualityRepository: TQualityRepository
	@Inject(QUALITY_SERVICE) private readonly qualityService: IQualityService
	@Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService

	async getList(pagination: IPagination) {
		const query = this.qualityRepository
			.createQueryBuilder('it')
			.leftJoinAndSelect('it.translations', 'translations')
			.orderBy('it.createdAt', 'DESC')

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
	}

	async create(dto: any) {
		return await this.qualityService.create(dto)
	}

	async remove(id: number) {
		return this.qualityRepository.delete(id)
	}

	async update(id: number, dto: any) {
		return this.qualityService.update(id, dto)
	}
}

import { Inject, Injectable } from '@nestjs/common'
import { GALLERY_SERVICE } from 'src/domain/galleries/consts'
import { IGalleryService } from 'src/domain/galleries/interface'
import {
	IProductionService,
	PRODUCTIONS_REPOSITORY,
	PRODUCTIONS_SERVICES,
	TProductionRepository,
} from 'src/domain/productions/typing'
import { IPagination, paginateAndGetMany } from 'src/shared'

@Injectable()
export class AdminProductionsService {
	@Inject(PRODUCTIONS_REPOSITORY) private readonly productionRepository: TProductionRepository
	@Inject(PRODUCTIONS_SERVICES) private readonly productionService: IProductionService
	@Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService

	async getList(pagination: IPagination) {
		const query = this.productionRepository
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
	}
	async store(dto: any) {
		return await this.productionService.create(dto)
	}

	async delete(id: number) {
		return await this.productionRepository.delete(id)
	}
}

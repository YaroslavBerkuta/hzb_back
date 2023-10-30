import { Inject, Injectable } from '@nestjs/common'
import { GALLERY_SERVICE } from 'src/domain/galleries/consts'
import { IGalleryService } from 'src/domain/galleries/interface'
import {
	INewsServices,
	NEWS_REPOSITORY,
	NEWS_SERVICES,
	TNewsRepository,
} from 'src/domain/news/typing'
import { IPagination, paginateAndGetMany } from 'src/shared'

@Injectable()
export class AdminNewsService {
	@Inject(NEWS_REPOSITORY) private readonly newsRepository: TNewsRepository
	@Inject(NEWS_SERVICES) private readonly newsService: INewsServices
	@Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService

	async getList(pagination: IPagination) {
		const query = this.newsRepository
			.createQueryBuilder('it')
			.leftJoinAndSelect('it.translations', 'translations')
			.orderBy('it.createdAt', 'DESC')

		const { items, count } = await paginateAndGetMany(query, pagination, 'it')

		await Promise.all(
			items.map(async (it, index, arr: any) => {
				arr[index].cover =
					(await this.galleryService.get({
						parentId: it.id,
						parentTable: 'news',
					})) || ''
			}),
		)
		return {
			items,
			count,
		}
	}

	async store(dto: any) {
		return await this.newsService.create(dto)
	}

	async delete(id: number) {
		return await this.newsRepository.delete(id)
	}
}

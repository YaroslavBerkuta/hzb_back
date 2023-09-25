import { Injectable, Inject } from '@nestjs/common'
import { GALLERY_SERVICE } from 'src/domain/galleries/consts'
import { IGalleryService } from 'src/domain/galleries/interface'
import { NEWS_REPOSITORY, TNewsRepository } from 'src/domain/news/typing'
import { IPagination, paginateAndGetMany } from 'src/shared'

@Injectable()
export class PublickNewsService {
	@Inject(NEWS_REPOSITORY) private readonly newsRepository: TNewsRepository
	@Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService

	public async getList(pagination: IPagination) {
		const query = this.newsRepository
			.createQueryBuilder('it')
			.leftJoinAndSelect('it.translations', 'translations')

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

		console.log({ items, count })

		return {
			items,
			count,
		}
	}
}

import { Inject, Injectable } from '@nestjs/common'
import { GALLERY_SERVICE } from 'src/domain/galleries/consts'
import { IGalleryService } from 'src/domain/galleries/interface'
import { PROJECTS_REPOSITORY, TProjectRepository } from 'src/domain/projects/typing'
import { IPagination, paginateAndGetMany } from 'src/shared'

@Injectable()
export class PublicProjectsService {
	@Inject(PROJECTS_REPOSITORY) private readonly projectRepository: TProjectRepository
	@Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService

	async getList(pagination: IPagination) {
		try {
			const query = this.projectRepository
				.createQueryBuilder('it')
				.leftJoinAndSelect('it.translations', 'translations')
				.leftJoinAndSelect('translations.info', 'info')
				.orderBy('it.createdAt', 'DESC')

			const { items, count } = await paginateAndGetMany(query, pagination, 'it')
			await Promise.all(
				items.map(async (it, index, arr: any) => {
					arr[index].cover =
						(await this.galleryService.get({
							parentId: it.id,
							parentTable: 'project',
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

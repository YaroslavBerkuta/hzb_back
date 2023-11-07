import { Inject, Injectable } from '@nestjs/common'
import { GALLERY_SERVICE } from 'src/domain/galleries/consts'
import { IGalleryService } from 'src/domain/galleries/interface'
import {
	IProjectService,
	PROJECTS_REPOSITORY,
	PROJECTS_SERVICES,
	TProjectRepository,
} from 'src/domain/projects/typing'
import { IPagination, paginateAndGetMany } from 'src/shared'

@Injectable()
export class AdminProjectsService {
	@Inject(PROJECTS_REPOSITORY) private readonly projectsRepository: TProjectRepository
	@Inject(PROJECTS_SERVICES) private readonly projectsService: IProjectService
	@Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService

	async getList(pagination: IPagination) {
		const query = this.projectsRepository
			.createQueryBuilder('it')
			.leftJoinAndSelect('it.translations', 'translations')
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
	}

	async create(dto: any) {
		return await this.projectsService.create(dto)
	}

	async remove(id: number) {
		return this.projectsRepository.delete(id)
	}
}

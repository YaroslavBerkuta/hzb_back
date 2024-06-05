import { Inject, Injectable } from '@nestjs/common'
import {
	FEEDBACKS_REPOSITORIES,
	FEEDBACKS_SERVICE,
	IFeedbacksService,
	TFeedbacksRepository,
} from 'src/domain/feedbacks/typing'
import { IPagination, paginateAndGetMany } from 'src/shared'

@Injectable()
export class AdminFeedbacksService {
	@Inject(FEEDBACKS_REPOSITORIES) private readonly feedbacksRepository: TFeedbacksRepository
	@Inject(FEEDBACKS_SERVICE) private readonly feedbacksService: IFeedbacksService

	async getList(pagination: IPagination) {
		const query = this.feedbacksRepository
			.createQueryBuilder('it')
			.orderBy('it.createdAt', 'DESC')

		const { items, count } = await paginateAndGetMany(query, pagination, 'it')

		// await Promise.all(
		// 	items.map(async (it, index, arr: any) => {
		// 		arr[index].cover =
		// 			(await this.galleryService.get({
		// 				parentId: it.id,
		// 				parentTable: 'feedbacks',
		// 			})) || ''
		// 	}),
		// )
		return {
			items,
			count,
		}
	}

	async create(dto: any) {
		return await this.feedbacksService.create(dto)
	}

	async delete(id: number) {
		try {
			await this.feedbacksRepository.delete(id)
		} catch (error) {}
	}

	async update(id: number, dto: any) {
        try {
            await this.feedbacksService.update(id, dto);
        } catch (error) {
            throw error;
        }
    }
}

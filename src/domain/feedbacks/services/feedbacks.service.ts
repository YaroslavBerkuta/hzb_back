import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
	FEEDBACKS_REPOSITORIES,
	IFeedbacksService,
	ICreateFeedbacksPayload,
	TFeedbacksRepository,
} from '../typing'

@Injectable()
export class FeedbacksService implements IFeedbacksService {
	@Inject(FEEDBACKS_REPOSITORIES) private readonly feedbacksRepository: TFeedbacksRepository

	public async create(payload: ICreateFeedbacksPayload) {
		const feedback = await this.feedbacksRepository.save(payload)
		console.log('Feedback created:', feedback)
		return feedback
	}

	public async update(id: number, payload: ICreateFeedbacksPayload) {
		const feedback = await this.feedbacksRepository.findOne({ where: { id } })

		if (!feedback) {
			console.error(`Feedback with id ${id} not found`)
			throw new NotFoundException('feedback not found')
		}

		if (payload) {
			try {
				await this.feedbacksRepository.update(id, payload)
				return feedback
			} catch (error) {
				throw error;
			}
		}
	}
}

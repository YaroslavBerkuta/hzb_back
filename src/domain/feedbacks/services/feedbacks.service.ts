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

	public async update(id: number, payload: Partial<ICreateFeedbacksPayload>) {
		const feedback = await this.feedbacksRepository.findOne({ where: { id } })

		if (!feedback) {
			throw new NotFoundException('feedback not found')
		}

		if (payload) {
			try {
				await this.feedbacksRepository.update(id, payload)
				return
			} catch (error) {
				throw error;
			}
		}
	}
}

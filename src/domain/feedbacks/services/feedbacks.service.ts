import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
	FEEDBACKS_REPOSITORIES,
	IFeedbacksService,
	ICreateFeedbacksPayload,
	TFeedbacksRepository,
} from '../typing'
import _ from 'lodash'

@Injectable()
export class FeedbacksService implements IFeedbacksService {
	@Inject(FEEDBACKS_REPOSITORIES) private readonly feedbacksRepository: TFeedbacksRepository

	public async create(payload: ICreateFeedbacksPayload) {
		const feedback = await this.feedbacksRepository.save(payload)
		
		return feedback
	}

	public async update(id: number, payload: Partial<ICreateFeedbacksPayload>) {
		let feedback = await this.feedbacksRepository.findOne({ where: { id } })

		if (!feedback) {
			throw new NotFoundException('feedback not found')
		}

		feedback = this.feedbacksRepository.merge(feedback, _.omitBy(_.omit(payload), _.isNil))
		await this.feedbacksRepository.update(id, feedback)
	}
}

import { Repository } from 'typeorm'
import { IFeedbacks } from './feedbacks.interface'

export type TFeedbacksRepository = Repository<IFeedbacks>

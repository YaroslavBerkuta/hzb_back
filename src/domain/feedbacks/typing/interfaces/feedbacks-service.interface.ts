import { Lang } from 'src/shared/enums'
import { IFeedbacks } from './feedbacks.interface'
export interface IFeedbacksService {
	create(payload: ICreateFeedbacksPayload): Promise<IFeedbacks>
	update(id: number, payload: ICreateFeedbacksPayload): Promise<IFeedbacks>
}

export interface ICreateFeedbacksPayload {
	id?: number;
    createdAt?: string;
    updatedAt?: string;
	type: string;
  	fullname: string;
	company?: string;
	feedback: string;
	reviewed: boolean;
}

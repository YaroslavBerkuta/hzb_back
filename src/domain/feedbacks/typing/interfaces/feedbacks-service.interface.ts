import { Lang } from 'src/shared/enums'
import { IFeedbacks } from './feedbacks.interface'
import { EFeedbacksType } from '../enums/feedbacks.enum';
export interface IFeedbacksService {
	create(payload: ICreateFeedbacksPayload): Promise<IFeedbacks>
	update(id: number, payload: ICreateFeedbacksPayload): Promise<void>
}

export interface ICreateFeedbacksPayload {
	id?: number;
    createdAt?: string;
    updatedAt?: string;
	type: EFeedbacksType;
  	fullname: string;
	company?: string;
	feedback: string;
	reviewed: boolean;
}

import { EFeedbacksType } from "../enums/feedbacks.enum";

export interface IFeedbacks {
	id: number;
    createdAt?: string;
    updatedAt?: string;
	type: EFeedbacksType;
  	fullname: string;
	company?: string;
	feedback: string;
	reviewed: boolean;
}
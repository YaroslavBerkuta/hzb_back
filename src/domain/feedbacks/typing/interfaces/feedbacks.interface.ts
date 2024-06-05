export interface IFeedbacks {
	id: number;
    createdAt?: string;
    updatedAt?: string;
	type: string;
  	fullname: string;
	company?: string;
	feedback: string;
	reviewed: boolean;
}
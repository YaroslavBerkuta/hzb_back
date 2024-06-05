import { BaseEntity } from 'src/shared'
import { Column, Entity } from 'typeorm'
import { IFeedbacks } from '../typing'

@Entity('feedbacks')
export class Feedback extends BaseEntity implements IFeedbacks {
	@Column()
	type: 'feedback' | 'offer' | 'remark';

	@Column()
  	fullname: string;
	
	@Column({ nullable: true })
	company?: string;
	
	@Column()
	feedback: string;

	@Column()
	reviewed: boolean;
}

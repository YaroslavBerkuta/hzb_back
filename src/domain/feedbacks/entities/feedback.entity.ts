import { BaseEntity } from 'src/shared'
import { Column, Entity } from 'typeorm'
import { IFeedbacks } from '../typing'
import { EFeedbacksType } from '../typing/enums/feedbacks.enum';

@Entity('feedbacks')
export class Feedback extends BaseEntity implements IFeedbacks {
	@Column({type: 'enum', enum: EFeedbacksType, default: EFeedbacksType.F})
	type: EFeedbacksType;

	@Column()
  	fullname: string;
	
	@Column({ nullable: true })
	company?: string;
	
	@Column()
	feedback: string;

	@Column()
	reviewed: boolean;
}

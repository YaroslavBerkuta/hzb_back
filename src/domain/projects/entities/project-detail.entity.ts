import { BaseEntity } from 'src/shared'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { IProjectDetail } from '../typing'
import { ProjectTranslate } from './project-translates.entity'

@Entity('projectDetails')
export class ProjectDetail extends BaseEntity implements IProjectDetail {
	@Column()
	title: string

	@Column()
	description: string

	@Column()
	projectTranslateId: number

	@ManyToOne(() => ProjectTranslate, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'projectTranslateId' })
	projectTranslate?: ProjectTranslate
}

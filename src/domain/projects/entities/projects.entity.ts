import { BaseEntity } from 'src/shared'
import { Column, Entity, OneToMany } from 'typeorm'
import { ProjectTranslate } from './project-translates.entity'
import { IProject } from '../typing'

@Entity('projects')
export class Project extends BaseEntity implements IProject {
	@Column({ nullable: true })
	years: string

	@OneToMany(() => ProjectTranslate, pt => pt.project)
	translations?: ProjectTranslate[]
}

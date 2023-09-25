import { BaseEntity } from 'src/shared'
import { Entity, OneToMany } from 'typeorm'
import { ProjectTranslate } from './project-translates.entity'
import { IProject } from '../typing'

@Entity('projects')
export class Project extends BaseEntity implements IProject {
	@OneToMany(() => ProjectTranslate, pt => pt.project)
	translations?: ProjectTranslate[]
}

import { BaseEntity } from 'src/shared'
import { Lang } from 'src/shared/enums'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { Project } from './projects.entity'
import { IPojectTranslate } from '../typing'

@Entity('projectTranslates')
export class ProjectTranslate extends BaseEntity implements IPojectTranslate {
	@Column({ type: 'varchar', enum: Lang, default: Lang.uk })
	lang: Lang

	@Column()
	name: string

	@Column()
	description: string

	@Column()
	projectId: number

	@ManyToOne(() => Project)
	@JoinColumn({ name: 'newsId' })
	project?: Project
}

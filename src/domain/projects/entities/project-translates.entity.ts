import { BaseEntity } from 'src/shared'
import { Lang } from 'src/shared/enums'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { Project } from './projects.entity'
import { IPojectTranslate } from '../typing'
import { ProjectDetail } from './project-detail.entity'

@Entity('projectTranslates')
export class ProjectTranslate extends BaseEntity implements IPojectTranslate {
	@Column({ type: 'varchar', enum: Lang, default: Lang.ua })
	lang: Lang

	@Column()
	name: string

	@Column({ nullable: true })
	sity: string

	@Column()
	projectId: number

	@ManyToOne(() => Project, p => p.translations, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'projectId' })
	project?: Project

	@OneToMany(() => ProjectDetail, pd => pd.projectTranslate)
	info?: ProjectDetail[]
}

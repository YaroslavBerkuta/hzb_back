import { BaseEntity } from 'src/shared'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Lang } from '../../../shared/enums/lang.enum'
import { Award } from './awards.entity'
import { IAwardTranslates } from '../typing'

@Entity('awardsTranslates')
export class AwardTranslate extends BaseEntity implements IAwardTranslates {
	@Column({ type: 'varchar', enum: Lang, default: Lang.en })
	lang: Lang

	@Column()
	name: string

	@Column()
	description: string

	@Column()
	awardId: number

	@ManyToOne(() => Award, a => a.translations, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'awardId' })
	award?: Award
}

import { BaseEntity } from 'src/shared'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Quality } from './quality.entity'
import { Lang } from 'src/shared/enums'

@Entity('qualityTranslates')
export class QualityTranslate extends BaseEntity {
	@Column({ type: 'varchar', enum: Lang, default: Lang.en })
	lang: Lang

	@Column()
	name: string

	@Column()
	description: string

	@Column()
	qualityId: number

	@ManyToOne(() => Quality, q => q.translations, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'qualityId' })
	quality?: Quality
}

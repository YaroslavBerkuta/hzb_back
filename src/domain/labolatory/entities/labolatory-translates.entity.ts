import { BaseEntity } from 'src/shared'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Labolatory } from './labolatory.entity'
import { Lang } from 'src/shared/enums'
import { ILabolatoryTranslate } from '../typing'

@Entity('labolatoryTranslates')
export class LabolatoryTranslate extends BaseEntity implements ILabolatoryTranslate {
	@Column({ type: 'varchar', enum: Lang, default: Lang.en })
	lang: Lang

	@Column()
	name: string

	@Column()
	description: string

	@Column()
	labolatoryId: number

	@ManyToOne(() => Labolatory, l => l.translations, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'labolatoryId' })
	labolatory?: Labolatory
}

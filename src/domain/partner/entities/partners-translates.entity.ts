import { BaseEntity } from 'src/shared'
import { Lang } from 'src/shared/enums'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Partner } from './partner.entity'
import { IPartnerTranslate } from '../types'

@Entity('partnersTranslates')
export class PartnerTranslate extends BaseEntity implements IPartnerTranslate {
	@Column({ type: 'varchar', enum: Lang, default: Lang.uk })
	lang: Lang

	@Column()
	name: string

	@Column()
	description: string

	@Column()
	partnerId: number

	@ManyToOne(() => Partner, p => p.translations, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'partnerId' })
	partner?: Partner
}

import { BaseEntity } from 'src/shared'
import { Lang } from 'src/shared/enums'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Production } from './productions.entity'
import { IProductionTranslate } from '../typing'

@Entity('productionsTranslates')
export class ProductionTranslate extends BaseEntity implements IProductionTranslate {
	@Column({ type: 'varchar', enum: Lang, default: Lang.uk })
	lang: Lang

	@Column()
	name: string

	@Column({ type: 'jsonb' })
	data: string

	@Column()
	productionId: number

	@ManyToOne(() => Production, p => p.translations, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'productionId' })
	production?: Production
}

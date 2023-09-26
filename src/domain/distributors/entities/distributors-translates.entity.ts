import { BaseEntity } from 'src/shared'
import { Lang } from 'src/shared/enums'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Distributor } from './distributors.entity'
import { IDistributionsTranslates } from '../typing/interfaces'

@Entity('distributorsTranslates')
export class DistributorTranslate extends BaseEntity implements IDistributionsTranslates {
	@Column({ type: 'varchar', enum: Lang, default: Lang.uk })
	lang: Lang

	@Column()
	name: string

	@Column()
	description: string

	@Column()
	distributorId: number

	@ManyToOne(() => Distributor, d => d.translations, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'distributorId' })
	distributor?: Distributor
}

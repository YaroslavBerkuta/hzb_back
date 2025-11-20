import { BaseEntity } from 'src/shared'
import { Column, Entity, OneToMany } from 'typeorm'
import { Regions } from '../typing'
import { DistributorTranslate } from './distributors-translates.entity'
import { IDistributions } from '../typing/interfaces'

@Entity('distributors')
export class Distributor extends BaseEntity implements IDistributions {
	@Column({ type: 'varchar', enum: Regions, unique: true })
	key: Regions
 
	@OneToMany(() => DistributorTranslate, dt => dt.distributor)
	translations?: DistributorTranslate[]
}

import { BaseEntity } from 'src/shared'
import { Entity, OneToMany } from 'typeorm'
import { ProductionTranslate } from './productions-translates.entity'
import { IProduction } from '../typing'

@Entity('productions')
export class Production extends BaseEntity implements IProduction {
	@OneToMany(() => ProductionTranslate, pt => pt.production)
	translations?: ProductionTranslate[]
}

import { BaseEntity } from 'src/shared'
import { Entity, OneToMany } from 'typeorm'
import { LabolatoryTranslate } from './labolatory-translates.entity'
import { ILabolatory } from '../typing'

@Entity('labolatory')
export class Labolatory extends BaseEntity implements ILabolatory {
	@OneToMany(() => LabolatoryTranslate, lt => lt.labolatory)
	translations?: LabolatoryTranslate[]
}

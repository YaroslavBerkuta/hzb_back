import { BaseEntity } from 'src/shared'
import { Column, Entity, OneToMany } from 'typeorm'
import { PartnerTranslate } from './partners-translates.entity'
import { IPartner } from '../types'

@Entity('partners')
export class Partner extends BaseEntity implements IPartner {
	@Column()
	link: string
	
	@OneToMany(() => PartnerTranslate, pt => pt.partner)
	translations?: PartnerTranslate[]
}

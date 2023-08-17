import { BaseEntity } from 'src/shared'
import { Column, Entity, OneToMany } from 'typeorm'
import { IClient } from '../typing'
import { ClientTranslate } from './clients-translates.entity'

@Entity('clients')
export class Client extends BaseEntity implements IClient {
	@Column()
	link: string

	@OneToMany(() => ClientTranslate, tr => tr.client)
	translations?: ClientTranslate[]
}

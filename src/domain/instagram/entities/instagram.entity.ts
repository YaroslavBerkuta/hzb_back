import { BaseEntity } from 'src/shared'
import { Column, Entity } from 'typeorm'
import { IInstagram } from '../types'

@Entity('instagram')
export class Instagram extends BaseEntity implements IInstagram {
	@Column()
	link: string
}

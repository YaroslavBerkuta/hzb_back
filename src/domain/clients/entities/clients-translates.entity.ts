import { BaseEntity } from 'src/shared'
import { Lang } from 'src/shared/enums'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Client } from './clients.entity'
import { IClientTranslate } from '../typing'

@Entity('clientsTranslates')
export class ClientTranslate extends BaseEntity implements IClientTranslate {
	@Column({ type: 'varchar', enum: Lang, default: Lang.uk })
	lang: Lang

	@Column()
	name: string

	@Column()
	description: string

	@Column()
	clientId: number

	@ManyToOne(() => Client, cl => cl.translations, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'clientId' })
	client?: Client
}

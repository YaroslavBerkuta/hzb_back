import { BaseEntity } from 'src/shared'
import { Column, Entity } from 'typeorm'
import { IUser } from '../typing'

@Entity('users')
export class User extends BaseEntity implements IUser {
	@Column({ nullable: false, select: false })
	password: string

	@Column({ nullable: false, select: false })
	passwordSalt: string
}

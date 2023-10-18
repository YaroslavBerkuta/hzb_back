import { BaseEntity } from 'src/shared'
import { Column, Entity } from 'typeorm'
import { IUser, UserRole } from '../typing'

@Entity('users')
export class User extends BaseEntity implements IUser {
	@Column({ nullable: false, unique: true })
	email: string

	@Column()
	username: string

	@Column({ enum: UserRole, default: UserRole.User })
	role: UserRole

	@Column({ nullable: false, select: false })
	password: string

	@Column({ nullable: false, select: false })
	passwordSalt: string
}

import { UserRole, UserStatus } from '../enums'

export interface IUser {
	id: number

	email: string
	username: string

	role: UserRole

	password: string
	passwordSalt: string

	createdAt?: string
	updatedAt?: string
}

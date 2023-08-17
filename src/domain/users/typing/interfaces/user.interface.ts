import { UserRole, UserStatus } from '../enums'

export interface IUser {
	id: number

	password: string
	passwordSalt: string

	createdAt?: string
	updatedAt?: string
}

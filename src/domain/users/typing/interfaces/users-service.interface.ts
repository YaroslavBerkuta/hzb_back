import { FindOneOptions } from 'typeorm'
import { UserRole } from '../enums'
import { IUser } from './user.interface'

export interface IUsersService {
	store(payload: IUserStorePayload): Promise<IUser>
	update(id: number, payload: IUserUpdatePayload): Promise<IUser>
	checkExist(payload: ICheckExistUserPayload): Promise<boolean>
	getByUsername(username: string): Promise<IUser | null>
	get(options: FindOneOptions<IUser>): Promise<IUser | null>
	getOne(userId: number): Promise<IUser | null>
}

export interface IUserUpdatePayload {
	firstName?: string
	lastName?: string

	avatarUrl?: string

	phoneNumber?: string

	login?: string
	email?: string

	role?: UserRole
}

export interface IUserStorePayload {
	firstName: string
	lastName: string

	phoneNumber?: string
	email?: string

	password: string
	role: UserRole
}

export interface ICheckExistUserPayload {
	email?: string
	login?: string
	phoneNumber?: string
}

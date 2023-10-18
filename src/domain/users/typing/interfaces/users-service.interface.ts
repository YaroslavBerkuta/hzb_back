import { FindOneOptions } from 'typeorm'
import { UserRole } from '../enums'
import { IUser } from './user.interface'

export interface IUsersService {
	store(payload: IUserStorePayload): Promise<IUser>
	update(id: number, payload: IUserUpdatePayload): Promise<IUser>
	checkExist(payload: ICheckExistUserPayload): Promise<boolean>
	getByEmail(email: string): Promise<IUser | null>
	get(options: FindOneOptions<IUser>): Promise<IUser | null>
	getOne(userId: number): Promise<IUser | null>
}

export interface IUserUpdatePayload {
	username: string
	email: string
	role?: UserRole
}

export interface IUserStorePayload {
	username: string
	email: string

	password: string
	role: UserRole
}

export interface ICheckExistUserPayload {
	email?: string
	username?: string
}

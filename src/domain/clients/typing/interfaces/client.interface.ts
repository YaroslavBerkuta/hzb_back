import { Lang } from 'src/shared/enums'

export interface IClient {
	id: number

	link: string

	translations?: IClientTranslate[]

	createdAt?: string
	updatedAt?: string
}

export interface IClientTranslate {
	id: number

	lang: Lang
	name: string
	description: string
	clientId: number

	createdAt?: string
	updatedAt?: string
}

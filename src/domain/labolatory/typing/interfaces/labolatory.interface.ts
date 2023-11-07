import { Lang } from 'src/shared/enums'

export interface ILabolatory {
	id: number
	translations?: ILabolatoryTranslate[]
	createdAt?: string
	updatedAt?: string
}

export interface ILabolatoryTranslate {
	id: number
	lang: Lang
	name: string
	description: string
	labolatoryId: number
	labolatory?: ILabolatory

	createdAt?: string
	updatedAt?: string
}

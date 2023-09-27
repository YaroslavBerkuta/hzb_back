import { Lang } from 'src/shared/enums'

export interface IProduction {
	id: number

	translations?: IProductionTranslate[]

	createdAt?: string
	updatedAt?: string
}

export interface IProductionTranslate {
	id: number
	lang: Lang
	name: string
	data: string
	productionId: number
	production?: IProduction
	createdAt?: string
	updatedAt?: string
}

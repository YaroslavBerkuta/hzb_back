import { Lang } from './../../../../shared/enums/lang.enum'
import { Regions } from '../enums'

export interface IDistributions {
	id: number
	key: Regions

	translations?: IDistributionsTranslates[]

	createdAt?: string
	updatedAt?: string
}

export interface IDistributionsTranslates {
	id: number
	lang: Lang
	name: string
	description: string
	distributorId: number

	distributor?: IDistributions

	createdAt?: string
	updatedAt?: string
}

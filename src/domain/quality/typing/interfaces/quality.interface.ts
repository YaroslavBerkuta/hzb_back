import { Lang } from 'src/shared/enums'

export interface IQuality {
	id: number
	translations?: IQualityTranslate[]
	createdAt?: string
	updatedAt?: string
}

export interface IQualityTranslate {
	id: number
	lang: Lang
	name: string
	description: string
	qualityId: number
	quality?: IQuality

	createdAt?: string
	updatedAt?: string
}

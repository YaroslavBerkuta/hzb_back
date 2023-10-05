import { Lang } from 'src/shared/enums'

export interface IQualityService {
	create(payload: ICreateQualityPayload): Promise<void>
}

export interface ICreateQualityPayload {
	translations?: ICreateQualityTranslatesPayload[]
}

interface ICreateQualityTranslatesPayload {
	lang: Lang
	name: string
	description: string
}

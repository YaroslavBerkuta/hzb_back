import { Lang } from 'src/shared/enums'
import { IQuality } from './quality.interface'

export interface IQualityService {
	create(payload: ICreateQualityPayload): Promise<IQuality>
}

export interface ICreateQualityPayload {
	translations?: ICreateQualityTranslatesPayload[]
}

interface ICreateQualityTranslatesPayload {
	lang: Lang
	name: string
	description: string
}

import { Lang } from 'src/shared/enums'

export interface IProductionService {
	create(payload: ICreateProductionPayload): Promise<void>
}

export interface ICreateProductionPayload {
	translations?: IProductionTranslatesPayload[]
}

export interface IProductionTranslatesPayload {
	lang: Lang
	name: string
	data: string
}

import { Lang } from 'src/shared/enums'
import { IProduction } from './productions.interface'

export interface IProductionService {
	create(payload: ICreateProductionPayload): Promise<IProduction>
}

export interface ICreateProductionPayload {
	translations?: IProductionTranslatesPayload[]
}

export interface IProductionTranslatesPayload {
	lang: Lang
	name: string
	data: string
}

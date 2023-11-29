import { Lang } from 'src/shared/enums'
import { IProduction } from './productions.interface'

export interface IProductionService {
	create(payload: ICreateProductionPayload): Promise<IProduction>
	update(id: number, payload: ICreateProductionPayload): Promise<void>
}

export interface ICreateProductionPayload {
	translations?: IProductionTranslatesPayload[]
}

export interface IProductionTranslatesPayload {
	lang: Lang
	name: string
	data: string
}

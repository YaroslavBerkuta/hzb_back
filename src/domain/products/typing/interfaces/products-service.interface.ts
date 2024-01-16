import { Lang } from 'src/shared/enums'
import { IProduct } from './products.inteface'

export interface IProductService {
	create(payload: ICreateProductPayload): Promise<IProduct>
	update(id: number, payload: Partial<ICreateProductPayload>): Promise<void>
}

export interface ICreateProductPayload {
	categoryId: number[]
	translations?: {
		lang: Lang
		name: string
		description: string
		info: string
	}[]
}

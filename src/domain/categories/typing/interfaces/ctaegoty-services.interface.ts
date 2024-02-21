import { Lang } from 'src/shared/enums'
import { ICategory } from './category.interface'

export interface ICategoryServices {
	create(payload: ICreateCategoryPayload): Promise<ICategory>
	update(id: number, payload: any): Promise<void>
}

interface ICategoryPayload {
	lang: Lang
	name: string
	description?: string
}

export interface ICreateCategoryPayload {
	key: string
	translations?: ICategoryPayload[]
	parentId?: number
}

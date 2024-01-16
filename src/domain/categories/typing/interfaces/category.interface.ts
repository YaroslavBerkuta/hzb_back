import { Lang } from 'src/shared/enums'
import { Repository } from 'typeorm'
import { CategoryType } from '../enums'
import { IProductCategory } from 'src/domain/products/typing'

export interface ICategory {
	id: number
	key: string
	type: CategoryType
	parentId?: number
	translations: ICategoryTranslate[]
	productCategory?: IProductCategory[]
	createdAt?: string
	updatedAt?: string
}

export interface ICategoryTranslate {
	id: number
	lang: Lang
	name: string
	description: string
	categoryId: number
	category?: ICategory
	createdAt?: string
	updatedAt?: string
}

export type TCategory = Repository<ICategory>
export type TCategoryTranslate = Repository<ICategoryTranslate>

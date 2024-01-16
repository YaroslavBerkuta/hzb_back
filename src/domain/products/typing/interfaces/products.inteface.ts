import { ICategory } from 'src/domain/categories/typing'
import { Repository } from 'typeorm'

export interface IProduct {
	id: number
	translations: IProductTranslate[]
	productCategory?: IProductCategory[]
	createdAt?: string
	updatedAt?: string
}

export interface IProductTranslate {
	id: number
	name: string
	description?: string
	info?: string
	previewHtml?: string
	productId: number
	product?: IProduct
	createdAt?: string
	updatedAt?: string
}

export interface IProductCategory {
	id: number
	categoryId: number
	productId: number
	product?: IProduct
	category?: ICategory
	createdAt?: string
	updatedAt?: string
}

export type TProductsRepository = Repository<IProduct>
export type TProductTranslateRepository = Repository<IProductTranslate>
export type TProductsToCategory = Repository<IProductCategory>

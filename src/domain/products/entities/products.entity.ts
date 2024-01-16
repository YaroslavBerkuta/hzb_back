import { BaseEntity } from 'src/shared'
import { Column, Entity, OneToMany } from 'typeorm'
import { ProductTranslate } from './products-translates.entity'
import { ProductToCategoty } from './product-to-category.entity'
import { IProduct } from '../typing'

@Entity('products')
export class Product extends BaseEntity implements IProduct {
	@OneToMany(() => ProductTranslate, pt => pt.product)
	translations: ProductTranslate[]

	@OneToMany(() => ProductToCategoty, ptc => ptc.product)
	productCategory?: ProductToCategoty[]
}

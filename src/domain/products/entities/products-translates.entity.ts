import { BaseEntity } from 'src/shared'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Product } from './products.entity'
import { IProductTranslate } from '../typing'

@Entity('productsTranslates')
export class ProductTranslate extends BaseEntity implements IProductTranslate {
	@Column()
	name: string

	@Column()
	description: string

	@Column()
	info: string

	@Column()
	productId: number

	@ManyToOne(() => Product, p => p.translations, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'productId' })
	product?: Product
}

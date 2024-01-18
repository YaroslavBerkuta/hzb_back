import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Product } from './products.entity'
import { Category } from 'src/domain/categories/entities'
import { IProductCategory } from '../typing'
import { BaseEntity } from 'src/shared'

@Entity('productsToCategory')
export class ProductToCategoty extends BaseEntity implements IProductCategory {
	@Column()
	categoryId: number

	@Column()
	productId: number

	@ManyToOne(() => Product, p => p.productCategory, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'productId' })
	product?: Product

	@ManyToOne(() => Category, c => c.productCategory, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'categoryId' })
	category?: Category
}

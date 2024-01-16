import { BaseEntity } from 'src/shared'
import { Column, Entity, OneToMany } from 'typeorm'
import { CategoryTranslate } from './catgeries-translates.entity'
import { ICategory } from '../typing'
import { CategoryType } from '../typing/enums'
import { ProductToCategoty } from 'src/domain/products/entities/product-to-category.entity'

@Entity('categories')
export class Category extends BaseEntity implements ICategory {
	@Column({ type: 'varchar', unique: true, nullable: false })
	key: string

	@Column({ type: 'varchar', enum: CategoryType, default: CategoryType.Category })
	type: CategoryType

	@Column({ nullable: true })
	parentId?: number

	@OneToMany(() => CategoryTranslate, ct => ct.category)
	translations: CategoryTranslate[]

	@OneToMany(() => ProductToCategoty, ptc => ptc.product)
	productCategory?: ProductToCategoty[]
}

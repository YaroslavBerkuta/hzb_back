import { BaseEntity } from 'src/shared'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Product } from './products.entity'
import { IProductTranslate } from '../typing'
import { Lang } from 'src/shared/enums'

@Entity('productsTranslates')
export class ProductTranslate extends BaseEntity implements IProductTranslate {
	@Column({ type: 'varchar', enum: Lang, nullable: true, default: Lang.ua })
	lang: Lang

	@Column()
	name: string

	@Column({ nullable: true })
	description?: string

	@Column({ nullable: true })
	info?: string

	@Column({ nullable: true })
	previewHtml?: string

	@Column()
	productId: number

	@ManyToOne(() => Product, p => p.translations, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'productId' })
	product?: Product
}

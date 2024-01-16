import { BaseEntity } from 'src/shared'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Category } from './catgeries.entity'
import { Lang } from 'src/shared/enums'
import { ICategoryTranslate } from '../typing'

@Entity('categoriesTranslates')
export class CategoryTranslate extends BaseEntity implements ICategoryTranslate {
	@Column({ type: 'varchar', enum: Lang, default: Lang.uk })
	lang: Lang

	@Column()
	name: string

	@Column()
	description: string

	@Column()
	categoryId: number

	@ManyToOne(() => Category, c => c.translations, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'categoryId' })
	category?: Category
}

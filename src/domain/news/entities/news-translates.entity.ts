import { BaseEntity } from 'src/shared'
import { Lang } from 'src/shared/enums'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { News } from './news.entity'
import { INewsTranslates } from '../typing'

@Entity('newsTranslates')
export class NewsTranslates extends BaseEntity implements INewsTranslates {
	@Column({ type: 'varchar', enum: Lang, default: Lang.ua })
	lang: Lang

	@Column()
	name: string

	@Column()
	description: string

	@Column()
	newsId: number

	@ManyToOne(() => News, n => n.translations, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'newsId' })
	news?: News
}

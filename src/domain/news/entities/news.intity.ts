import { BaseEntity } from 'src/shared'
import { Entity, OneToMany } from 'typeorm'
import { NewsTranslates } from './news-translates.intity'
import { INews } from '../typing'

@Entity('news')
export class News extends BaseEntity implements INews {
	@OneToMany(() => NewsTranslates, nt => nt.news)
	translations?: NewsTranslates[]
}

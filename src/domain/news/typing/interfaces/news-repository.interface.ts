import { Repository } from 'typeorm'
import { INews, INewsTranslates } from './news.interface'

export type TNewsRepository = Repository<INews>
export type TNewsTranslatesRepository = Repository<INewsTranslates>

import { Repository } from 'typeorm'
import { IAwardTranslates, IAwards } from './awards.interface'

export type TAwardsRepository = Repository<IAwards>
export type TAwardsTranslatesRepository = Repository<IAwardTranslates>

import { Repository } from 'typeorm'
import { IDistributions, IDistributionsTranslates } from './distributions.interface'

export type TDistributionsRepository = Repository<IDistributions>
export type TDistributionsTranslatesRepository = Repository<IDistributionsTranslates>

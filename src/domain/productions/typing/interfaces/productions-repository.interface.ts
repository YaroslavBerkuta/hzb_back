import { Repository } from 'typeorm'
import { IProduction, IProductionTranslate } from './productions.interface'

export type TProductionRepository = Repository<IProduction>
export type TProductionTranslatesRepository = Repository<IProductionTranslate>

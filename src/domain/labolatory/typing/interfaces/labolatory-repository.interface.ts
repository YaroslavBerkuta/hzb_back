import { Repository } from 'typeorm'
import { ILabolatoryTranslate, ILabolatory } from './labolatory.interface'

export type TLabolatoryTranslateRepository = Repository<ILabolatoryTranslate>
export type TLabolatoryRepository = Repository<ILabolatory>

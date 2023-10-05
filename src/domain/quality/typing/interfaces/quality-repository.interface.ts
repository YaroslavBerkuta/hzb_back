import { Repository } from 'typeorm'
import { IQuality, IQualityTranslate } from './quality.interface'

export type TQualityTranslateRepository = Repository<IQualityTranslate>
export type TQualityRepository = Repository<IQuality>

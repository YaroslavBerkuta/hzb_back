import { BaseEntity } from 'src/shared'
import { Entity, OneToMany } from 'typeorm'
import { QualityTranslate } from './quality-translates.entity'
import { IQuality } from '../typing'

@Entity('quality')
export class Quality extends BaseEntity implements IQuality {
	@OneToMany(() => QualityTranslate, qt => qt.quality)
	translations?: QualityTranslate[]
}

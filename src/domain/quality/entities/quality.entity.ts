import { BaseEntity } from 'src/shared'
import { Entity, OneToMany } from 'typeorm'
import { QualityTranslate } from './quality-translates.entity'

@Entity('quality')
export class Quality extends BaseEntity {
	@OneToMany(() => QualityTranslate, qt => qt.quality)
	translations?: QualityTranslate[]
}

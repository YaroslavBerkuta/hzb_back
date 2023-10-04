import { BaseEntity } from 'src/shared'
import { Entity, OneToMany } from 'typeorm'
import { AwardTranslate } from './awards-translates.entity'
import { IAwards } from '../typing'

@Entity('awards')
export class Award extends BaseEntity implements IAwards {
	@OneToMany(() => AwardTranslate, at => at.award)
	translations?: AwardTranslate[]
}

import { Repository } from 'typeorm'
import { IPojectTranslate, IProject, IProjectDetail } from './project.interface'

export type TProjectRepository = Repository<IProject>
export type TProjectTranslateRepository = Repository<IPojectTranslate>
export type TProjectDetailRepository = Repository<IProjectDetail>

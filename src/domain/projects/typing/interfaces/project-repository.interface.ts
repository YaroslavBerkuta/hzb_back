import { Repository } from 'typeorm'
import { IPojectTranslate, IProject } from './project.interface'

export type TProjectRepository = Repository<IProject>
export type TProjectTranslateRepository = Repository<IPojectTranslate>

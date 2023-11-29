import { Lang } from 'src/shared/enums'
import { IProject } from './project.interface'

export interface IProjectService {
	create(payload: ICreateProjectPayload): Promise<IProject>
	update(id: number, payload: ICreateProjectPayload): Promise<void>
}

export interface ICreateProjectPayload {
	translations?: ICreateProjectTranslatePayload[]
}

export interface ICreateProjectTranslatePayload {
	lang: Lang
	name: string
	description: string
	projectId?: number
}

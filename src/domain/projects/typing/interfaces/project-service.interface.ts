import { Lang } from 'src/shared/enums'
import { IProject } from './project.interface'

export interface IProjectService {
	create(payload: ICreateProjectPayload): Promise<IProject>
	update(id: number, payload: ICreateProjectPayload): Promise<void>
}

export interface ICreateProjectPayload {
	years: string
	translations?: ICreateProjectTranslatePayload[]
}

export interface ICreateProjectTranslatePayload {
	lang: Lang
	name: string
	sity: string
	projectId?: number
	info?: any[]
}

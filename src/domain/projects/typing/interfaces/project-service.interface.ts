import { Lang } from 'src/shared/enums'

export interface IProjectService {
	create(payload: ICreateProjectPayload): Promise<void>
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

import { Lang } from 'src/shared/enums'
export interface IProject {
	id: number

	translations?: IPojectTranslate[]

	createdAt?: string
	updatedAt?: string
}

export interface IPojectTranslate {
	id: number
	lang: Lang
	name: string
	description: string
	projectId: number
	project?: IProject

	createdAt?: string
	updatedAt?: string
}

import { Lang } from 'src/shared/enums'
export interface IProject {
	id: number
	years: string

	translations?: IPojectTranslate[]

	createdAt?: string
	updatedAt?: string
}

export interface IPojectTranslate {
	id: number
	lang: Lang
	name: string
	sity: string
	projectId: number
	project?: IProject

	createdAt?: string
	updatedAt?: string
}

export interface IProjectDetail {
	id: number
	title: string
	description: string
	projectTranslateId: number

	createdAt?: string
	updatedAt?: string
}

import { Lang } from 'src/shared/enums'

export interface INewsServices {
	create(payload: ICreateNewsPayload): Promise<void>
}

export interface ICreateNewsTranslatesPayload {
	lang: Lang
	name: string
	description: string
	newsId: number
}

export interface ICreateNewsPayload {
	translations: ICreateNewsTranslatesPayload[]
}

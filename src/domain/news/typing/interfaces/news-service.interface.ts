import { Lang } from 'src/shared/enums'
import { INews } from './news.interface'

export interface INewsServices {
	create(payload: ICreateNewsPayload): Promise<INews>
	update(id: number, payload: ICreateNewsPayload): Promise<INews>
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

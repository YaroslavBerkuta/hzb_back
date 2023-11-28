import { Lang } from 'src/shared/enums'
import { INews } from './news.interface'
import { UpdateResult } from 'typeorm'

export interface INewsServices {
	create(payload: ICreateNewsPayload): Promise<INews>
	update(id: number, payload: ICreateNewsPayload): Promise<void>
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

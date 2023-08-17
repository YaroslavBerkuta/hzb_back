import { IClient } from './client.interface'
import { Lang } from '../../../../shared/enums/lang.enum'

export interface IClientService {
	create(payload: IClientCreatePayload): Promise<IClient>
	update(id: number, payload: IClientUpdatePayload): Promise<void>
}

export interface IClientCreatePayload {
	link: string
	translations: IClientTranslatePayload[]
}

export interface IClientTranslatePayload {
	lang: Lang
	name: string
	description: string
}

export interface IClientUpdatePayload {
	link?: string
	translations: IClientTranslatePayload[]
}

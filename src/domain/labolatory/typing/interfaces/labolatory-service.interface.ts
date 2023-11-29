import { Lang } from 'src/shared/enums'
import { ILabolatory } from './labolatory.interface'

export interface ILabolatoryService {
	create(payload: ICreateLabolatoryPayload): Promise<ILabolatory>
	update(id: number, payload: ICreateLabolatoryPayload): Promise<void>
}

export interface ICreateLabolatoryPayload {
	translations?: ICreateLabolatoryTranslatesPayload[]
}

interface ICreateLabolatoryTranslatesPayload {
	lang: Lang
	name: string
	description: string
}

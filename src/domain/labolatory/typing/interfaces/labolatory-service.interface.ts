import { Lang } from 'src/shared/enums'
import { ILabolatory } from './labolatory.interface'

export interface ILabolatoryService {
	create(payload: ICreateLabolatoryPayload): Promise<ILabolatory>
}

export interface ICreateLabolatoryPayload {
	translations?: ICreateLabolatoryTranslatesPayload[]
}

interface ICreateLabolatoryTranslatesPayload {
	lang: Lang
	name: string
	description: string
}

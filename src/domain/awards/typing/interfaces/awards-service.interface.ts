import { Lang } from 'src/shared/enums'
import { IAwards } from './awards.interface'
export interface IAwardsService {
	create(payload: ICreateAwardsPayload): Promise<IAwards>
	update(id: number, payload: ICreateAwardsPayload): Promise<void>
}

export interface ICreateAwardsPayload {
	translations?: ICreateAwardsTranslatesPayload[]
}

interface ICreateAwardsTranslatesPayload {
	lang: Lang
	name: string
	description: string
}

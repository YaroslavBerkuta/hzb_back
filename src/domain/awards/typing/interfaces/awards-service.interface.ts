import { Lang } from 'src/shared/enums'
import { IAwards } from './awards.interface'
export interface IAwardsService {
	create(payload: ICreateAwardsPayload): Promise<IAwards>
}

export interface ICreateAwardsPayload {
	translations?: ICreateAwardsTranslatesPayload[]
}

interface ICreateAwardsTranslatesPayload {
	lang: Lang
	name: string
	description: string
}

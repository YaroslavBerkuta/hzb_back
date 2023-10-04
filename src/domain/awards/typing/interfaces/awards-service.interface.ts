import { Lang } from 'src/shared/enums'
export interface IAwardsService {
	create(payload: ICreateAwardsPayload): Promise<void>
}

export interface ICreateAwardsPayload {
	translations?: ICreateAwardsTranslatesPayload[]
}

interface ICreateAwardsTranslatesPayload {
	lang: Lang
	name: string
	description: string
}

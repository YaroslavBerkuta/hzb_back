import { Regions } from '../enums'
import { Lang } from '../../../../shared/enums/lang.enum'
import { IDistributions } from './distributions.interface'

export interface IDistributionService {
	create(payload: ICreateDistributionPayload): Promise<void>
	getDistributor(key: Regions): Promise<IDistributions>
}

export interface ICreateDistributionPayload {
	key: Regions
	translations: ICreateDistributionTranslatesPayload[]
}

interface ICreateDistributionTranslatesPayload {
	lang: Lang
	name: string
	description: string
}

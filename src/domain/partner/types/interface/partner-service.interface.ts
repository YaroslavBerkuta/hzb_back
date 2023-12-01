import { Lang } from 'src/shared/enums'
import { IPartner } from './partner.interface'

export interface IPartnerService {
	create(payload: ICreatePartnerPayload): Promise<IPartner>
	update(id: number, payload: ICreatePartnerPayload): Promise<void>
}

export interface ICreatePartnerPayload {
	link: string
	translations: ICreatePartnerTranslatesPayload[]
}

export interface ICreatePartnerTranslatesPayload {
	lang: Lang
	name: string
	description: string
	partnerId: number
}

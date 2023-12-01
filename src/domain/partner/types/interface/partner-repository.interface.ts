import { Repository } from 'typeorm'
import { IPartner, IPartnerTranslate } from './partner.interface'

export type TPartnerRepository = Repository<IPartner>
export type TPartnerTranslateRepository = Repository<IPartnerTranslate>

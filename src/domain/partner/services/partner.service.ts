import { Inject, Injectable } from '@nestjs/common'
import {
	ICreatePartnerPayload,
	IPartnerService,
	PARTNER_REPOSITORY,
	PARTNER_TRANSLATE_REPOSITORY,
	TPartnerRepository,
	TPartnerTranslateRepository,
} from '../types'

@Injectable()
export class PartnerService implements IPartnerService {
	@Inject(PARTNER_REPOSITORY) private readonly partnerRepository: TPartnerRepository
	@Inject(PARTNER_TRANSLATE_REPOSITORY)
	private readonly partnerTranslateRepository: TPartnerTranslateRepository

	public async create(payload: ICreatePartnerPayload) {
		const partner = await this.partnerRepository.save(payload)
		await this.putTranslations(partner.id, payload.translations, false)
		return partner
	}

	private async putTranslations(partnerId: number, translates: any, clearPrevios = true) {
		if (clearPrevios) await this.partnerTranslateRepository.delete({ partnerId })
		const toSave = translates.map(it => ({
			lang: it.lang,
			name: it.name,
			description: it.description,
			partnerId,
		}))

		await this.partnerTranslateRepository.insert(toSave)
		return toSave
	}

	public async update(id: number, payload: ICreatePartnerPayload) {
		await this.partnerRepository.update(id, { link: payload.link })
		await this.putTranslations(id, payload.translations, true)
	}
}

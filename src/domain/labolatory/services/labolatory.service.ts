import { Inject, Injectable } from '@nestjs/common'
import {
	ICreateLabolatoryPayload,
	ILabolatoryService,
	LABOLATORY_REPOSITORY,
	LABOLATORY_TRANSLATES_REPOSITORY,
	TLabolatoryRepository,
	TLabolatoryTranslateRepository,
} from '../typing'

@Injectable()
export class LabolatoryService implements ILabolatoryService {
	@Inject(LABOLATORY_REPOSITORY) private readonly laboloatoryRepository: TLabolatoryRepository
	@Inject(LABOLATORY_TRANSLATES_REPOSITORY)
	private readonly labolatoryTranslatesRepository: TLabolatoryTranslateRepository

	public async create(payload: ICreateLabolatoryPayload) {
		try {
			const quality = await this.laboloatoryRepository.save(payload)
			await this.putTranslations(quality.id, payload.translations, false)
			return quality
		} catch (error) {
			console.log('error:', error)
			throw new Error(error)
		}
	}

	private async putTranslations(
		labolatoryId: number,
		translates: ICreateLabolatoryPayload['translations'],
		clearPrevios = true,
	) {
		try {
			if (clearPrevios) await this.labolatoryTranslatesRepository.delete({ labolatoryId })
			const toSave = translates.map(it => ({
				lang: it.lang,
				name: it.name,
				labolatoryId,
				description: it.description,
			}))

			await this.labolatoryTranslatesRepository.insert(toSave)
			return toSave
		} catch (error) {
			console.log('error:', error)
			throw new Error(error)
		}
	}

	public async update(id: number, payload: ICreateLabolatoryPayload) {
		try {
			await this.putTranslations(id, payload.translations, true)
		} catch (error) {
			console.log('error:', error)
			throw new Error(error)
		}
	}
}

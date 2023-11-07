import { Inject, Injectable } from '@nestjs/common'
import {
	ICreateQualityPayload,
	IQualityService,
	QUALITY_REPOSITORY,
	QUALITY_TRANSLATES_REPOSITORY,
	TQualityRepository,
	TQualityTranslateRepository,
} from '../typing'

@Injectable()
export class QualityService implements IQualityService {
	@Inject(QUALITY_REPOSITORY) private readonly qualityRepository: TQualityRepository
	@Inject(QUALITY_TRANSLATES_REPOSITORY)
	private readonly qualityTranslatesRepository: TQualityTranslateRepository

	public async create(payload: ICreateQualityPayload) {
		try {
			const quality = await this.qualityRepository.save(payload)
			await this.putTranslations(quality.id, payload.translations, false)
			return quality
		} catch (error) {
			console.log('error:', error)
			throw new Error(error)
		}
	}

	private async putTranslations(
		qualityId: number,
		translates: ICreateQualityPayload['translations'],
		clearPrevios = true,
	) {
		try {
			if (clearPrevios) await this.qualityTranslatesRepository.delete({ qualityId })
			const toSave = translates.map(it => ({
				lang: it.lang,
				name: it.name,
				qualityId,
				description: it.description,
			}))

			await this.qualityTranslatesRepository.insert(toSave)
			return toSave
		} catch (error) {
			console.log('error:', error)
			throw new Error(error)
		}
	}
}

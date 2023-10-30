import { Inject, Injectable } from '@nestjs/common'
import {
	AWARDS_REPOSITORIES,
	AWARDS_TRANSLATES_REPOSITORIES,
	IAwardsService,
	ICreateAwardsPayload,
	TAwardsRepository,
	TAwardsTranslatesRepository,
} from '../typing'

@Injectable()
export class AwardsService implements IAwardsService {
	@Inject(AWARDS_REPOSITORIES) private readonly awardsRepository: TAwardsRepository
	@Inject(AWARDS_TRANSLATES_REPOSITORIES)
	private readonly awardsTranslatesRepository: TAwardsTranslatesRepository

	public async create(payload: ICreateAwardsPayload) {
		const award = await this.awardsRepository.save(payload)
		await this.putTranslations(award.id, payload.translations, false)
		return award
	}

	private async putTranslations(
		awadrId: number,
		translates: ICreateAwardsPayload['translations'],
		clearPrevios = true,
	) {
		try {
			if (clearPrevios) await this.awardsTranslatesRepository.delete(awadrId)

			const toSave = translates.map(it => ({
				lang: it.lang,
				name: it.name,
				awardId: awadrId,
				description: it.description,
			}))

			await this.awardsTranslatesRepository.insert(toSave)
			return toSave
		} catch (error) {
			console.log('error:', error)
		}
	}
}

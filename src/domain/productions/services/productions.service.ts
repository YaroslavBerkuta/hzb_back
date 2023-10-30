import { Inject, Injectable } from '@nestjs/common'
import {
	ICreateProductionPayload,
	IProductionService,
	PRODUCTIONS_REPOSITORY,
	PRODUCTIONS_TRANSLATES_REPOSITORY,
	TProductionRepository,
	TProductionTranslatesRepository,
} from '../typing'

@Injectable()
export class ProductionsService implements IProductionService {
	@Inject(PRODUCTIONS_REPOSITORY) private readonly productionRepository: TProductionRepository
	@Inject(PRODUCTIONS_TRANSLATES_REPOSITORY)
	private readonly productionTranslatesRepository: TProductionTranslatesRepository

	public async create(payload: ICreateProductionPayload) {
		try {
			const production = await this.productionRepository.save(payload)
			await this.putTranslations(production.id, payload.translations, false)
			return production
		} catch (error) {
			console.log('error:', error)
			throw new Error(error)
		}
	}

	private async putTranslations(
		productionId: number,
		translates: ICreateProductionPayload['translations'],
		clearPrevios = true,
	) {
		try {
			if (clearPrevios) await this.productionTranslatesRepository.delete({ productionId })
			const toSave = translates.map(it => ({
				lang: it.lang,
				name: it.name,
				productionId,
				data: it.data,
			}))

			await this.productionTranslatesRepository.insert(toSave)
			return toSave
		} catch (error) {
			console.log('error:', error)
			throw new Error(error)
		}
	}
}

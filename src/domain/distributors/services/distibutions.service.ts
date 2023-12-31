import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import {
	DISTRIBUTIONS_REPOSITORY,
	DISTRIBUTIONS_TRANSLATES_REPOSITORY,
	ICreateDistributionPayload,
	IDistributionService,
	Regions,
	TDistributionsRepository,
	TDistributionsTranslatesRepository,
} from '../typing'

@Injectable()
export class DistributionsService implements IDistributionService {
	@Inject(DISTRIBUTIONS_REPOSITORY)
	private readonly distributionRepository: TDistributionsRepository
	@Inject(DISTRIBUTIONS_TRANSLATES_REPOSITORY)
	private readonly distributionTranslatesRepository: TDistributionsTranslatesRepository

	public async create(payload: ICreateDistributionPayload) {
		try {
			const distributor = await this.distributionRepository.save(payload)
			await this.putTranslations(distributor.id, payload.translations, false)
		} catch (error) {
			console.log('error:', error)
			throw new Error(error)
		}
	}

	public async getDistributor(key: Regions) {
		try {
			const query = await this.distributionRepository
				.createQueryBuilder('it')
				.leftJoinAndSelect('it.translations', 'translations')
				.where('it.key = :key', { key })
				.getOne()
			return query
		} catch (error) {
			console.log('error:', error)
			throw new Error(error)
		}
	}

	private async putTranslations(
		distributorId: number,
		translates: ICreateDistributionPayload['translations'],
		clearPrevios = true,
	) {
		try {
			if (clearPrevios) await this.distributionTranslatesRepository.delete({ distributorId })
			const toSave = translates.map(it => ({
				lang: it.lang,
				name: it.name,
				distributorId,
				description: it.description,
			}))

			await this.distributionTranslatesRepository.insert(toSave)
			return toSave
		} catch (error) {
			console.log('error:', error)
			throw new Error(error)
		}
	}

	public async update(id: number, payload: ICreateDistributionPayload) {
		try {
			await this.putTranslations(id, payload.translations, true)
		} catch (error) {
			console.log(error)
		}
	}
}

import { Inject, Injectable } from '@nestjs/common'
import {
	DISTRIBUTIONS_REPOSITORY,
	DISTRIBUTIONS_SERVICES,
	IDistributionService,
	TDistributionsRepository,
} from 'src/domain/distributors/typing'
import { IPagination, paginateAndGetMany } from 'src/shared'

@Injectable()
export class AdminDistributorsService {
	@Inject(DISTRIBUTIONS_REPOSITORY)
	private readonly distributorRepository: TDistributionsRepository
	@Inject(DISTRIBUTIONS_SERVICES) private readonly distributorService: IDistributionService

	async getList(pagination: IPagination) {
		const query = this.distributorRepository
			.createQueryBuilder('it')
			.leftJoinAndSelect('it.translations', 'translations')
			.orderBy('it.createdAt', 'DESC')

		const { items, count } = await paginateAndGetMany(query, pagination, 'it')

		return {
			items,
			count,
		}
	}

	async create(dto: any) {
		return await this.distributorService.create(dto)
	}

	async remove(id: number) {
		return this.distributorRepository.delete(id)
	}

	async update(id: number, dto: any) {
		return this.distributorService.update(id, dto)
	}
}

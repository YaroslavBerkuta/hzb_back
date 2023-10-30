import { Inject, Injectable } from '@nestjs/common'
import {
	DISTRIBUTIONS_SERVICES,
	IDistributionService,
	Regions,
} from 'src/domain/distributors/typing'

@Injectable()
export class PublicDistributorsService {
	@Inject(DISTRIBUTIONS_SERVICES)
	private readonly distributorServices: IDistributionService

	async getDistributor(key: Regions) {
		const ds = await this.distributorServices.getDistributor(key)
		return ds
	}
}

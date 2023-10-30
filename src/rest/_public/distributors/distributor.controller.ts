import { Controller, Get, Param } from '@nestjs/common'
import { Regions } from 'src/domain/distributors/typing'
import { PublicDistributorsService } from './distributors.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('PUBLIC | DISTRIBUTORS')
@Controller('public/distributor')
export class PublicDistributorController {
	constructor(private readonly distributorService: PublicDistributorsService) {}

	@Get(':key')
	getDistributor(@Param('key') key: Regions) {
		return this.distributorService.getDistributor(key)
	}
}

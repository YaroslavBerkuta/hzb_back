import { Controller, Get } from '@nestjs/common'
import { IPagination, ReqPagination } from 'src/shared'
import { PublicPartnerService } from './partners.service'

@Controller('public/partners')
export class PublicPartnersController {
	constructor(private readonly partnerService: PublicPartnerService) {}

	@Get('')
	getList(@ReqPagination() pagination: IPagination) {
		return this.partnerService.getList(pagination)
	}
}

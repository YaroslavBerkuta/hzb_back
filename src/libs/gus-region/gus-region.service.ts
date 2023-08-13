import { Inject, Injectable } from '@nestjs/common'
import { GusApiRegon } from '@sverz/regonapi'
import * as _ from 'lodash'
import { GUS_REGION_API_KEY } from './typing/consts'
import { IGusRegionService } from './typing/interfaces'

@Injectable()
export class GusRegionService implements IGusRegionService {
	constructor(@Inject(GUS_REGION_API_KEY) private apiKey: string) {}

	public async search(nip_pesel: string) {
		const api = new GusApiRegon(this.apiKey, true)
		await api.login()
		const result = await api.search({ Nip: nip_pesel })
		await api.logout()

		if (_.isArray(result)) return result[0]
		else return result
	}
}

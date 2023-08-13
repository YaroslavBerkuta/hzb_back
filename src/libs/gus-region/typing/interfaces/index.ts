import { GusApiRegonItemInterface } from '@sverz/regonapi'

export interface GusRegionModuleOptions {
	apiKey: string
}

export interface IGusRegionService {
	search(nip_pesel: string): Promise<GusApiRegonItemInterface>
}

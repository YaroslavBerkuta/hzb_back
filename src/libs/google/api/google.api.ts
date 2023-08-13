import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import {
	Client,
	Language,
	PlaceAutocompleteType,
	PlaceInputType,
} from '@googlemaps/google-maps-services-js'
import { GOOGLE_MODULE_OPTIONS, IGoogleApi, IGoogleModuleOptions } from '../typing'
import { autocompleteTransform, transformDetailsResult } from '../transforms'
import { Lang } from 'src/shared/enums'

@Injectable()
export class GoogleApi implements OnModuleInit, IGoogleApi {
	private client: Client

	@Inject(GOOGLE_MODULE_OPTIONS)
	private options: IGoogleModuleOptions

	async onModuleInit() {
		this.client = new Client()
	}

	public async getCountries(searchString: string) {
		const result = await this.client.placeAutocomplete({
			params: {
				input: searchString,
				key: this.options.apiKey,
				types: ['country'] as any,
			},
		})

		return autocompleteTransform(result)
	}

	public async getAdresses(searchString: string, countryCode: string) {
		const result = await this.client.placeAutocomplete({
			params: {
				input: searchString,
				key: this.options.apiKey,
				types: PlaceAutocompleteType.address,
				components: [`country:${countryCode}`],
			},
		})

		return autocompleteTransform(result)
	}

	public async searchCities(searchString: string) {
		const result = await this.client.placeAutocomplete({
			params: {
				input: searchString,
				key: this.options.apiKey,
				types: PlaceAutocompleteType.cities,
			},
		})
		return autocompleteTransform(result)
	}

	public async getDetails(placeId: string, lang: Lang) {
		const detail = await this.client.placeDetails({
			params: {
				place_id: placeId,
				key: this.options.apiKey,
				language: (lang === Lang.uk ? 'uk' : lang) as any,
			},
		})

		return transformDetailsResult(detail)
	}

	public async getCitites(searchString: string, countryCode: string) {
		const result = await this.client.placeAutocomplete({
			params: {
				input: searchString,
				key: this.options.apiKey,
				types: PlaceAutocompleteType.cities,
				components: [`country:${countryCode}`],
			},
		})
		return autocompleteTransform(result)
	}
}

// * Multiple countries must be passed as multiple `country:XX` filters, with the pipe character (`|`) as a separator.
// * For example: `components=country:us|country:pr|country:vi|country:gu|country:mp` would restrict your results
// * to places within the United States and its unincorporated organized territories.

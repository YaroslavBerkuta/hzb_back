import { PlaceAutocompleteResult } from '@googlemaps/google-maps-services-js'
import { Lang } from 'src/shared/enums'
import { AutocompleteResultDto, PlaceDetailsDto } from '../dtos'

export interface IGoogleApi {
	getCountries(searchString: string, lang: string): Promise<AutocompleteResultDto[]>
	getAdresses(searchString: string, countryCode: string): Promise<AutocompleteResultDto[]>
	getDetails(placeId: string, lang: Lang): Promise<PlaceDetailsDto>
	getCitites(searchString: string, code: string): Promise<AutocompleteResultDto[]>
	searchCities(searchString: string): Promise<AutocompleteResultDto[]>
}

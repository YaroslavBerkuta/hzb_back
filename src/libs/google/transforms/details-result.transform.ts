import { PlaceData, PlaceDetailsResponse } from '@googlemaps/google-maps-services-js'
import { PlaceDetailsDto } from '../typing'

export const transformDetailsResult = (respone: PlaceDetailsResponse): PlaceDetailsDto => {
	const data = respone.data.result

	return {
		name: data.name,
		placeId: data.place_id,
		shortName: data.address_components[0].short_name,
		components: transformAdressComponents(data),
		lat: data.geometry.location.lat,
		lng: data.geometry.location.lng,
	}
}

const transformAdressComponents = (data: Partial<PlaceData>) => {
	const result: Record<string, [string, string]> = {}

	const components = data.address_components

	components.map(it => {
		it.types.map(tp => {
			result[tp] = [it.long_name, it.short_name]
		})
	})

	return result
}

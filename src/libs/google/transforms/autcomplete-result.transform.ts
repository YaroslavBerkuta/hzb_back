import { PlaceAutocompleteResponse } from '@googlemaps/google-maps-services-js'
import { AutocompleteResultDto } from '../typing'

export const autocompleteTransform = (
	response: PlaceAutocompleteResponse,
): AutocompleteResultDto[] => {
	const { predictions } = response.data

	return predictions.map(it => {
		return {
			description: it.description,
			distanceMeters: it.distance_meters,
			placeId: it.place_id,
		}
	})
}

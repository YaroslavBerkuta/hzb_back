import { DtoProperty } from 'src/shared'

export class AutocompleteResultDto {
	@DtoProperty()
	description: string

	@DtoProperty()
	distanceMeters?: number

	@DtoProperty()
	placeId: string
}

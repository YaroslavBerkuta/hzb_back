import { DtoProperty } from 'src/shared'

export class PlaceDetailsDto {
	@DtoProperty()
	name: string

	@DtoProperty()
	placeId: string

	@DtoProperty()
	shortName: string

	@DtoProperty()
	components: Record<string, [string, string]>

	@DtoProperty()
	lat: number

	@DtoProperty()
	lng: number
}

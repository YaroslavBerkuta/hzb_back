import { DtoProperty, DtoPropertyOptional } from 'src/shared'

export class MainFormDto {
	@DtoProperty()
	name: string

	@DtoProperty()
	surname: string

	@DtoProperty()
	email: string

	@DtoProperty()
	phone: string

	@DtoPropertyOptional()
	comment?: string
}

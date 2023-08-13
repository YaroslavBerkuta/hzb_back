import { DtoProperty, DtoPropertyOptional } from '../decorators'
import { Lang } from '../enums'

export class BaseTranslateDto {
	@DtoProperty()
	lang: Lang

	@DtoProperty()
	name: string

	@DtoPropertyOptional()
	adressLine?: string
}

export class StoreBaseTranslateDto {
	@DtoProperty()
	lang: Lang

	@DtoProperty()
	name: string

	@DtoPropertyOptional()
	adressLine?: string
}

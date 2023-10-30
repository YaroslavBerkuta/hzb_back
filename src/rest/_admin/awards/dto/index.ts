import { Type } from 'class-transformer'
import { DtoProperty } from 'src/shared'
import { Lang } from 'src/shared/enums'

class CreateAwardsTranslatesDto {
	@DtoProperty({ type: String, enum: Lang, default: Lang.uk })
	lang: Lang

	@DtoProperty()
	name: string

	@DtoProperty()
	description: string
}

export class CreateAwardsDto {
	@DtoProperty({ isArray: true, type: CreateAwardsTranslatesDto })
	@Type(() => CreateAwardsTranslatesDto)
	translations: CreateAwardsTranslatesDto[]
}

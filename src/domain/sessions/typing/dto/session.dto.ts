import { DtoProperty, DtoPropertyOptional } from 'src/shared'

export class SessionDto {
	@DtoPropertyOptional()
	id?: number

	@DtoProperty()
	accessToken: string

	@DtoProperty()
	refreshToken: string

	@DtoPropertyOptional()
	userId?: number

	@DtoPropertyOptional()
	deviceName?: string

	@DtoPropertyOptional()
	createdAt?: string
}

export class TokensDto {
	@DtoProperty()
	accessToken: string

	@DtoProperty()
	refreshToken: string

	@DtoPropertyOptional()
	is2FAEnabled?: boolean
}

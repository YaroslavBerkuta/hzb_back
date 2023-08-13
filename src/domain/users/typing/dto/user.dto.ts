import { DtoProperty } from 'src/shared'
import { UserRole, UserStatus } from '../enums'

export class UserDto {
	@DtoProperty()
	id: number

	@DtoProperty()
	email?: string

	@DtoProperty()
	phoneNumber?: string

	@DtoProperty()
	firstName: string

	@DtoProperty()
	lastName: string

	@DtoProperty()
	avatarUrl?: string

	@DtoProperty({
		enum: UserRole,
	})
	role: UserRole

	@DtoProperty({
		enum: UserStatus,
	})
	status: UserStatus

	@DtoProperty()
	createdAt: string

	@DtoProperty()
	updatedAt: string
}

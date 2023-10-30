import { DtoProperty } from 'src/shared'

export class StoreFileDto {
	@DtoProperty()
	filename: string

	@DtoProperty()
	directory: string

	@DtoProperty()
	type: string

	@DtoProperty()
	parentId: string
}

export class StoreFileResDto {
	@DtoProperty()
	presignedUrl: string

	@DtoProperty()
	uploadId: string
}

export class FinishFileUpload {
	@DtoProperty()
	uploadId: string
}

export class RemoveFilesParamsDto {
	@DtoProperty({ isArray: true })
	ids: number[]
}

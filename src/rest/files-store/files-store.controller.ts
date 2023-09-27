import { Body, Controller, Delete, Put, Query } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { FilesStoreService } from './files-store.service'
import { AuthGuard } from 'src/domain/sessions/decorators'
import { FinishFileUpload, RemoveFilesParamsDto, StoreFileDto, StoreFileResDto } from './dto'

@ApiTags('File-Store')
@Controller('file-store')
export class FilesStoreController {
	constructor(private readonly fileStoreService: FilesStoreService) {}

	@ApiOperation({ summary: 'Store file' })
	@ApiBody({ type: StoreFileDto })
	@ApiResponse({
		status: 201,
		description: 'store file in bucket',
		type: StoreFileResDto,
	})
	@AuthGuard()
	@Put('start-upload-file')
	public create(@Body() dto: StoreFileDto) {
		return this.fileStoreService.getLinkToUploadFile(dto)
	}

	@AuthGuard()
	@Put('finish-upload-file')
	public async finishUploadFile(@Body() dto: FinishFileUpload) {
		return this.fileStoreService.finishUploadFile(dto)
	}

	@AuthGuard()
	@Delete()
	public async delete(@Query() dto: RemoveFilesParamsDto) {
		return this.fileStoreService.removeFiles(dto)
	}
}

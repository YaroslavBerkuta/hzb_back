import { Controller, Get } from '@nestjs/common'
import { PublicProjectsService } from './projects.service'
import { ApiTags } from '@nestjs/swagger'
import { ApiImplictPagination, IPagination, ReqPagination } from 'src/shared'

@ApiTags('PUBLIC | PROJECTS')
@Controller('public/projects')
export class PublicProjectsController {
	constructor(private readonly projectService: PublicProjectsService) {}

	@ApiImplictPagination()
	@Get()
	getList(@ReqPagination() pagination: IPagination) {
		return this.projectService.getList(pagination)
	}
}

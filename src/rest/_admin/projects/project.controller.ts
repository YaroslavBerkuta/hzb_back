import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { AdminProjectsService } from './project.service'
import { IPagination, ReqPagination } from 'src/shared'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('ADMIN | PROJECTS')
@Controller('admin/projects')
export class AdminProjectsController {
	constructor(private readonly projectsService: AdminProjectsService) {}

	@Get()
	getList(@ReqPagination() pagination: IPagination) {
		return this.projectsService.getList(pagination)
	}

	@Post()
	create(@Body() dto: any) {
		return this.projectsService.create(dto)
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.projectsService.remove(id)
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() dto: any) {
		return this.projectsService.update(id, dto)
	}

	@Delete('/production/:id')
	removeProduction(@Param('id') id: number) {
		return this.projectsService.removeProduction(id)
	}
}

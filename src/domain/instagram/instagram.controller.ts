import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common'
import { InstagramService } from './instagram.service'
import { IPagination, ReqPagination } from 'src/shared'
import { INSTAGRAM_SERVICE } from './types'

@Controller('instagram')
export class InstagramController {
	constructor(@Inject(INSTAGRAM_SERVICE) private readonly instagramService: InstagramService) {}

	@Post()
	store(@Body() dto: any) {
		return this.instagramService.store(dto)
	}

	@Get('list')
	getList(@ReqPagination() pagination: IPagination) {
		return this.instagramService.getList(pagination)
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() dto: any) {
		return this.instagramService.update(id, dto)
	}

	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.instagramService.del(id)
	}
}

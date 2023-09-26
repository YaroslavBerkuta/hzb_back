import { Body, Controller, Post } from '@nestjs/common'
import { MainFormDto } from './dto/index'
import { PublicFormService } from './form.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('PUBLIC | FORM')
@Controller('public/form')
export class PublicFormController {
	constructor(private readonly formService: PublicFormService) {}
	@Post('main')
	public sendMain(@Body() dto: MainFormDto) {
		return this.formService.sendMain(dto)
	}
}

import { Body, Controller, Post } from '@nestjs/common'
import { AdminAuthService } from './auth.service'

@Controller('admin/auth')
export class AdminAuthController {
	constructor(private readonly authService: AdminAuthService) {}

	@Post()
	login(@Body() dto: any) {
		return this.authService.signIn(dto)
	}

	@Post('refresh-token')
	public async refreshToken(@Body() dto: any) {
		return await this.authService.refreshToken(dto)
	}
}

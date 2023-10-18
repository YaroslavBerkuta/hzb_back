import { DynamicModule, Module } from '@nestjs/common'
import { AdminAuthController } from './auth.controller'
import { AdminAuthService } from './auth.service'
import { UsersModule } from '../../../domain/users/users.module'
import { SessionsModule } from '../../../domain/sessions/sessions.module'
import { JwtModule } from '../../../libs/jwt/jwt.module'

@Module({})
export class AdminAuthModule {
	static forRoot(): DynamicModule {
		return {
			module: AdminAuthModule,
			controllers: [AdminAuthController],
			providers: [AdminAuthService],
			imports: [
				UsersModule.forFeature(),
				SessionsModule.forFeature(),
				JwtModule.forFeature(),
			],
		}
	}
}

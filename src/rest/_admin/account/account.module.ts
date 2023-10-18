import { DynamicModule, Module } from '@nestjs/common'
import { UsersModule } from 'src/domain/users/users.module'
import { AdminAccountController } from './account.controlle'
import { AdminAccountService } from './account.service'

@Module({})
export class AdminAccountModule {
	static forRoot(): DynamicModule {
		return {
			module: AdminAccountModule,
			controllers: [AdminAccountController],
			providers: [AdminAccountService],
			imports: [UsersModule.forFeature()],
		}
	}
}

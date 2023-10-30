import { DynamicModule, Module } from '@nestjs/common'
import { AdminDistributorsService } from './distributors.service'
import { DistributorsModule } from 'src/domain/distributors/distributors.module'
import { AdminDistributorsController } from './distributors.controller'

@Module({})
export class AdminDistributorsModule {
	static forRoot(): DynamicModule {
		return {
			module: AdminDistributorsModule,
			providers: [AdminDistributorsService],
			controllers: [AdminDistributorsController],
			imports: [DistributorsModule.forFeature()],
		}
	}
}

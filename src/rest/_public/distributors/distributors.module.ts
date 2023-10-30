import { DynamicModule, Module } from '@nestjs/common'
import { DistributorsModule } from 'src/domain/distributors/distributors.module'
import { PublicDistributorsService } from './distributors.service'
import { PublicDistributorController } from './distributor.controller'

@Module({})
export class PublicDistributorsModule {
	static forRoot(): DynamicModule {
		return {
			module: PublicDistributorsModule,
			providers: [PublicDistributorsService],
			controllers: [PublicDistributorController],
			imports: [DistributorsModule.forFeature()],
		}
	}
}

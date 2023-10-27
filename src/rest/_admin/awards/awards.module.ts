import { DynamicModule, Module } from '@nestjs/common'
import { AwardsModule } from 'src/domain/awards/awards.module'
import { AdminAwardsService } from './awards.service'
import { AdminAwardsController } from './awards.controller'
import { GalleryModule } from 'src/domain/galleries/gallery.module'

@Module({})
export class AdminAwardsModule {
	static forRoot(): DynamicModule {
		return {
			module: AdminAwardsModule,
			controllers: [AdminAwardsController],
			providers: [AdminAwardsService],
			imports: [AwardsModule.forFeature(), GalleryModule.forFeature()],
		}
	}
}

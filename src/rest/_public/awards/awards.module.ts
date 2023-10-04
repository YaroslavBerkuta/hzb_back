import { DynamicModule, Module } from '@nestjs/common'
import { PublicAwardsController } from './awards.controller'
import { PublicAwardsService } from './awards.service'
import { AwardsModule } from 'src/domain/awards/awards.module'
import { GalleryModule } from 'src/domain/galleries/gallery.module'

@Module({})
export class PublicAwardsModule {
	static forRoot(): DynamicModule {
		return {
			module: PublicAwardsModule,
			controllers: [PublicAwardsController],
			providers: [PublicAwardsService],
			imports: [AwardsModule.forFeature(), GalleryModule.forFeature()],
		}
	}
}

import { DynamicModule, Module } from '@nestjs/common'
import { PublicQualityController } from './quality.controller'
import { PublicQualityService } from './quality.service'
import { QualityModule } from 'src/domain/quality/quality.module'
import { GalleryModule } from 'src/domain/galleries/gallery.module'

@Module({})
export class PublicQualityModule {
	static forRoot(): DynamicModule {
		return {
			module: PublicQualityModule,
			controllers: [PublicQualityController],
			providers: [PublicQualityService],
			imports: [QualityModule.forFeature(), GalleryModule.forFeature()],
		}
	}
}

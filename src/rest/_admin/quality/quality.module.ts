import { DynamicModule, Module } from '@nestjs/common'
import { QualityModule } from 'src/domain/quality/quality.module'
import { GalleryModule } from 'src/domain/galleries/gallery.module'
import { AdminQualityController } from './quality.controller'
import { AdminQualityService } from './quality.service'

@Module({})
export class AdminQualityModule {
	static forRoot(): DynamicModule {
		return {
			module: AdminQualityModule,
			providers: [AdminQualityService],
			controllers: [AdminQualityController],
			imports: [QualityModule.forFeature(), GalleryModule.forFeature()],
		}
	}
}

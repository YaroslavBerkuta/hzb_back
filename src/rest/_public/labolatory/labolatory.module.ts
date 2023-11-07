import { DynamicModule, Module } from '@nestjs/common'
import { GalleryModule } from 'src/domain/galleries/gallery.module'
import { LabolatoryModule } from 'src/domain/labolatory/labolatory.module'
import { PublicLabolatoryController } from './labolatory.controller'
import { PublicLabolatoryService } from './labolatory.service'

@Module({})
export class PublicLabolatoryModule {
	static forRoot(): DynamicModule {
		return {
			module: PublicLabolatoryModule,
			controllers: [PublicLabolatoryController],
			providers: [PublicLabolatoryService],
			imports: [LabolatoryModule.forFeature(), GalleryModule.forFeature()],
		}
	}
}

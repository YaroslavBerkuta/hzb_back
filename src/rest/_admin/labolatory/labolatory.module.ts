import { DynamicModule, Module } from '@nestjs/common'
import { GalleryModule } from 'src/domain/galleries/gallery.module'
import { LabolatoryModule } from 'src/domain/labolatory/labolatory.module'
import { AdminLabolatoryService } from './labolatory.service'
import { AdminLabolatoryController } from './labolatory.controller'

@Module({})
export class AdminLabolatoryModule {
	static forRoot(): DynamicModule {
		return {
			module: AdminLabolatoryModule,
			controllers: [AdminLabolatoryController],
			providers: [AdminLabolatoryService],
			imports: [LabolatoryModule.forFeature(), GalleryModule.forFeature()],
		}
	}
}

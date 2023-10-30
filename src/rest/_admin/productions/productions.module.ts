import { DynamicModule, Module } from '@nestjs/common'
import { GalleryModule } from 'src/domain/galleries/gallery.module'
import { ProductionsModule } from 'src/domain/productions/productions.module'
import { AdminProductionsService } from './productions.service'
import { AdminProductionsController } from './productions.controller'

@Module({})
export class AdminProductionsModule {
	static forRoot(): DynamicModule {
		return {
			module: AdminProductionsModule,
			controllers: [AdminProductionsController],
			providers: [AdminProductionsService],
			imports: [ProductionsModule.forFeature(), GalleryModule.forFeature()],
		}
	}
}

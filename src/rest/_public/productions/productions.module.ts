import { DynamicModule, Module } from '@nestjs/common'
import { GalleryModule } from 'src/domain/galleries/gallery.module'
import { ProductionsModule } from 'src/domain/productions/productions.module'
import { PublicProductionsService } from './productions.service'
import { PublicProductionsController } from './productions.controller'

@Module({})
export class PublicProductionsModule {
	static forRoot(): DynamicModule {
		return {
			module: PublicProductionsModule,
			controllers: [PublicProductionsController],
			providers: [PublicProductionsService],
			imports: [GalleryModule.forFeature(), ProductionsModule.forFeature()],
		}
	}
}

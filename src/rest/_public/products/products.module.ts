import { DynamicModule, Module } from '@nestjs/common'
import { GalleryModule } from 'src/domain/galleries/gallery.module'
import { ProductsModule } from 'src/domain/products/products.module'
import { PublicProductsController } from './products.controller'
import { PublicProductsService } from './products.service'

@Module({})
export class PublicProductsModule {
	static forRoot(): DynamicModule {
		return {
			module: PublicProductsModule,
			controllers: [PublicProductsController],
			providers: [PublicProductsService],
			imports: [ProductsModule.forFeature(), GalleryModule.forFeature()],
		}
	}
}

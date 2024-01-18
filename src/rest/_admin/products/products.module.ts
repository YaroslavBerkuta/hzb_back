import { DynamicModule, Module } from '@nestjs/common'
import { AdminProductsService } from './products.service'
import { AdminProductsController } from './products.controller'
import { ProductsModule } from 'src/domain/products/products.module'
import { GalleryModule } from 'src/domain/galleries/gallery.module'
import { CategoriesModule } from 'src/domain/categories/categories.module'

@Module({})
export class AdminProductsModule {
	static forRoot(): DynamicModule {
		return {
			module: AdminProductsModule,
			controllers: [AdminProductsController],
			providers: [AdminProductsService],
			imports: [
				ProductsModule.forFeature(),
				GalleryModule.forFeature(),
				CategoriesModule.forFeature(),
			],
		}
	}
}

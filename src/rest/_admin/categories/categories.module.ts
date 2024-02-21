import { DynamicModule, Module } from '@nestjs/common'
import { CategoriesModule } from 'src/domain/categories/categories.module'
import { GalleryModule } from 'src/domain/galleries/gallery.module'
import { AdminCategoryController } from './categories.controller'
import { AdminCategoryService } from './categories.service'

@Module({})
export class AdminCategoryModule {
	static forRoot(): DynamicModule {
		return {
			module: AdminCategoryModule,
			controllers: [AdminCategoryController],
			providers: [AdminCategoryService],
			imports: [CategoriesModule.forFeature(), GalleryModule.forFeature()],
		}
	}
}

import { DynamicModule, Module } from '@nestjs/common'
import { CategoriesModule } from 'src/domain/categories/categories.module'
import { PublicCategoriesController } from './categories.controller'
import { PublicCategoriesService } from './categories.service'

@Module({})
export class PublicCategoriesModule {
	static forRoot(): DynamicModule {
		return {
			module: PublicCategoriesModule,
			providers: [PublicCategoriesService],
			controllers: [PublicCategoriesController],
			imports: [CategoriesModule.forFeature()],
		}
	}
}

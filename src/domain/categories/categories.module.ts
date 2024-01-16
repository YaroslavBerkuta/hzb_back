import { Module, DynamicModule } from '@nestjs/common'
import { provideEntity } from 'src/libs/database'
import { CATEGORY_REPOSITORY, CATEGORY_SERVICE, CATEGORY_TRANSLATES_REPOSITORY } from './typing'
import { Category, CategoryTranslate } from './entities'
import { provideClass } from 'src/shared'
import { CategoryService } from './services/category.service'
import { CatgorySeed } from './seeders'

@Module({})
export class CategoriesModule {
	static getProviders() {
		return [
			provideEntity(CATEGORY_REPOSITORY, Category),
			provideEntity(CATEGORY_TRANSLATES_REPOSITORY, CategoryTranslate),
			provideClass(CATEGORY_SERVICE, CategoryService),
		]
	}

	static imports() {
		return []
	}

	static forRoot(): DynamicModule {
		return {
			module: CategoriesModule,
			providers: [...this.getProviders(), CatgorySeed],
			imports: this.imports(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: CategoriesModule,
			providers: this.getProviders(),
			imports: this.imports(),
			exports: [CATEGORY_REPOSITORY, CATEGORY_SERVICE],
		}
	}
}

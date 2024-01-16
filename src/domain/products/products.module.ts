import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs/database'
import { Product, ProductToCategoty, ProductTranslate } from './entities'
import {
	PRODUCTS_REPOSITORY,
	PRODUCTS_SERVICE,
	PRODUCTS_TO_CATEGORY,
	PRODUCTS_TRANSLATES_REPOSITORY,
} from './typing/consts'
import { provideClass } from 'src/shared'
import { ProductService } from './services/product.service'

@Module({})
export class ProductsModule {
	static getProviders() {
		return [
			provideEntity(PRODUCTS_REPOSITORY, Product),
			provideEntity(PRODUCTS_TRANSLATES_REPOSITORY, ProductTranslate),
			provideEntity(PRODUCTS_TO_CATEGORY, ProductToCategoty),
			provideClass(PRODUCTS_SERVICE, ProductService),
		]
	}

	static imports() {
		return []
	}

	static forRoot(): DynamicModule {
		return {
			module: ProductsModule,
			providers: this.getProviders(),
			imports: this.imports(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: ProductsModule,
			providers: this.getProviders(),
			imports: this.imports(),
			exports: [PRODUCTS_SERVICE, PRODUCTS_REPOSITORY],
		}
	}
}

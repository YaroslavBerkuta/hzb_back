import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs/database'
import {
	PRODUCTIONS_REPOSITORY,
	PRODUCTIONS_SERVICES,
	PRODUCTIONS_TRANSLATES_REPOSITORY,
} from './typing'
import { Production, ProductionTranslate } from './entities'
import { provideClass } from 'src/shared'

@Module({})
export class ProductionsModule {
	static getProviders() {
		return [
			provideEntity(PRODUCTIONS_REPOSITORY, Production),
			provideEntity(PRODUCTIONS_TRANSLATES_REPOSITORY, ProductionTranslate),
			// provideClass(PRODUCTIONS_SERVICES, null),
		]
	}

	static imports() {
		return []
	}

	static forRoot(): DynamicModule {
		return {
			module: ProductionsModule,
			providers: this.getProviders(),
			imports: this.imports(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: ProductionsModule,
			providers: this.getProviders(),
			imports: this.imports(),
			exports: [PRODUCTIONS_REPOSITORY],
		}
	}
}

import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs/database'
import { provideClass } from 'src/shared'
import { Labolatory, LabolatoryTranslate } from './entities'
import {
	LABOLATORY_REPOSITORY,
	LABOLATORY_SERVICE,
	LABOLATORY_TRANSLATES_REPOSITORY,
} from './typing'
import { LabolatoryService } from './services/labolatory.service'

@Module({})
export class LabolatoryModule {
	static getProviders() {
		return [
			provideEntity(LABOLATORY_REPOSITORY, Labolatory),
			provideEntity(LABOLATORY_TRANSLATES_REPOSITORY, LabolatoryTranslate),
			provideClass(LABOLATORY_SERVICE, LabolatoryService),
		]
	}

	static imports() {
		return []
	}

	static forRoot(): DynamicModule {
		return {
			module: LabolatoryModule,
			providers: this.getProviders(),
			imports: this.imports(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: LabolatoryModule,
			providers: this.getProviders(),
			imports: this.imports(),
			exports: [LABOLATORY_REPOSITORY, LABOLATORY_SERVICE],
		}
	}
}

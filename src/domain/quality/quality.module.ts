import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs/database'
import { provideClass } from 'src/shared'
import { QUALITY_REPOSITORY, QUALITY_SERVICE, QUALITY_TRANSLATES_REPOSITORY } from './typing'
import { Quality, QualityTranslate } from './entities'
import { QualityService } from './services/quality.service'

@Module({})
export class QualityModule {
	static getProviders() {
		return [
			provideEntity(QUALITY_REPOSITORY, Quality),
			provideEntity(QUALITY_TRANSLATES_REPOSITORY, QualityTranslate),
			provideClass(QUALITY_SERVICE, QualityService),
		]
	}

	static imports() {
		return []
	}

	static forRoot(): DynamicModule {
		return {
			module: QualityModule,
			providers: this.getProviders(),
			imports: this.imports(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: QualityModule,
			providers: this.getProviders(),
			imports: this.imports(),
			exports: [QUALITY_REPOSITORY, QUALITY_SERVICE],
		}
	}
}

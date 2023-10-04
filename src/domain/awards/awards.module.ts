import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs/database'
import { AWARDS_REPOSITORIES, AWARDS_SERVICE, AWARDS_TRANSLATES_REPOSITORIES } from './typing'
import { Award, AwardTranslate } from './entities'
import { provideClass } from 'src/shared'
import { AwardsService } from './services/awards.service'

@Module({})
export class AwardsModule {
	static getProviders() {
		return [
			provideEntity(AWARDS_REPOSITORIES, Award),
			provideEntity(AWARDS_TRANSLATES_REPOSITORIES, AwardTranslate),
			provideClass(AWARDS_SERVICE, AwardsService),
		]
	}

	static imports() {
		return []
	}

	static forRoot(): DynamicModule {
		return {
			module: AwardsModule,
			providers: this.getProviders(),
			imports: this.imports(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: AwardsModule,
			providers: this.getProviders(),
			imports: this.imports(),
			exports: [AWARDS_SERVICE, AWARDS_REPOSITORIES],
		}
	}
}

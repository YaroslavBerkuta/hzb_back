import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs/database'
import {
	DISTRIBUTIONS_REPOSITORY,
	DISTRIBUTIONS_SERVICES,
	DISTRIBUTIONS_TRANSLATES_REPOSITORY,
} from './typing'
import { Distributor, DistributorTranslate } from './entities'
import { provideClass } from 'src/shared'
import { DistributionsService } from './services/distibutions.service'

@Module({})
export class DistributorsModule {
	static getProviders() {
		return [
			provideEntity(DISTRIBUTIONS_REPOSITORY, Distributor),
			provideEntity(DISTRIBUTIONS_TRANSLATES_REPOSITORY, DistributorTranslate),
			provideClass(DISTRIBUTIONS_SERVICES, DistributionsService),
		]
	}

	static imports() {
		return []
	}

	static forRoot(): DynamicModule {
		return {
			module: DistributorsModule,
			imports: this.imports(),
			providers: this.getProviders(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: DistributorsModule,
			imports: this.imports(),
			providers: this.getProviders(),
			exports: [DISTRIBUTIONS_SERVICES],
		}
	}
}

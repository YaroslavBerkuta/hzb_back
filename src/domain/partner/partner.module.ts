import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs/database'
import { PARTNER_REPOSITORY, PARTNER_SERVICE, PARTNER_TRANSLATE_REPOSITORY } from './types'
import { Partner, PartnerTranslate } from './entities'
import { provideClass } from 'src/shared'
import { PartnerService } from './services/partner.service'

@Module({})
export class PartnerModule {
	static getProviders() {
		return [
			provideEntity(PARTNER_REPOSITORY, Partner),
            provideEntity(PARTNER_TRANSLATE_REPOSITORY,PartnerTranslate),
			provideClass(PARTNER_SERVICE, PartnerService),
		]
	}

	static imports() {
		return []
	}

	static forRoot(): DynamicModule {
		return {
			module: PartnerModule,
			providers: this.getProviders(),
			imports: this.imports(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: PartnerModule,
			providers: this.getProviders(),
			imports: this.imports(),
			exports: [PARTNER_SERVICE, PARTNER_REPOSITORY],
		}
	}
}

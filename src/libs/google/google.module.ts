import { DynamicModule, Module, Provider } from '@nestjs/common'
import { provideClass } from 'src/shared'
import { GoogleApi } from './api'
import { GOOGLE_API, GOOGLE_MODULE_OPTIONS, IGoogleModuleOptions } from './typing'

@Module({})
export class GoogleModule {
	private static options: IGoogleModuleOptions

	private static getProviders(): Provider<any>[] {
		return [
			{
				provide: GOOGLE_MODULE_OPTIONS,
				useValue: GoogleModule.options,
			},
			provideClass(GOOGLE_API, GoogleApi),
		]
	}

	static forRoot(options: IGoogleModuleOptions): DynamicModule {
		GoogleModule.options = options
		return {
			module: GoogleModule,
			providers: GoogleModule.getProviders(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: GoogleModule,
			providers: GoogleModule.getProviders(),
			exports: [GOOGLE_API],
		}
	}
}

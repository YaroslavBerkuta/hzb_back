import { DynamicModule, Module } from '@nestjs/common'
import { provideClass } from 'src/shared'
import { GusRegionService } from './gus-region.service'
import { GUS_REGION_API_KEY, GUS_REGION_SERVICE } from './typing/consts'
import { GusRegionModuleOptions } from './typing/interfaces'

@Module({})
export class GusRegionModule {
	private static options: GusRegionModuleOptions

	static forRoot(options: GusRegionModuleOptions): DynamicModule {
		this.options = options

		return {
			module: GusRegionModule,
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: GusRegionModule,
			providers: [
				provideClass(GUS_REGION_SERVICE, GusRegionService),
				{
					provide: GUS_REGION_API_KEY,
					useValue: this.options.apiKey,
				},
			],
			exports: [GUS_REGION_SERVICE],
		}
	}
}

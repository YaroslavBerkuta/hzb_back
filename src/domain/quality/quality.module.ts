import { DynamicModule, Module } from '@nestjs/common'

@Module({})
export class QualityModule {
	static getProviders() {
		return []
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
			exports: [],
		}
	}
}

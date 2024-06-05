import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs/database'
import { FEEDBACKS_REPOSITORIES, FEEDBACKS_SERVICE } from './typing'
import { Feedback } from './entities'
import { provideClass } from 'src/shared'
import { FeedbacksService } from './services/feedbacks.service'

@Module({})
export class FeedbacksModule {
	static getProviders() {
		return [
			provideEntity(FEEDBACKS_REPOSITORIES, Feedback),
			provideClass(FEEDBACKS_SERVICE, FeedbacksService),
		]
	}

	static imports() {
		return []
	}

	static forRoot(): DynamicModule {
		return {
			module: FeedbacksModule,
			providers: this.getProviders(),
			imports: this.imports(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: FeedbacksModule,
			providers: this.getProviders(),
			imports: this.imports(),
			exports: [FEEDBACKS_SERVICE, FEEDBACKS_REPOSITORIES],
		}
	}
}

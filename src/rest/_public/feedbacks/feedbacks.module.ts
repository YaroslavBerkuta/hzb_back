import { DynamicModule, Module } from '@nestjs/common'
import { PublicFeedbacksController } from './feedbacks.controller'
import { PublicFeedbacksService } from './feedbacks.service'
import { FeedbacksModule } from 'src/domain/feedbacks/feedbacks.module'

@Module({})
export class PublicFeedbacksModule {
	static forRoot(): DynamicModule {
		return {
			module: PublicFeedbacksModule,
			controllers: [PublicFeedbacksController],
			providers: [PublicFeedbacksService],
			imports: [FeedbacksModule.forFeature()],
		}
	}
}

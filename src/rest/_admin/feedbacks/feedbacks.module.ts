import { DynamicModule, Module } from '@nestjs/common'
import { FeedbacksModule } from 'src/domain/feedbacks/feedbacks.module'
import { AdminFeedbacksService } from './feedbacks.service'
import { AdminFeedbacksController } from './feedbacks.controller'

@Module({})
export class AdminFeedbacksModule {
	static forRoot(): DynamicModule {
		return {
			module: AdminFeedbacksModule,
			controllers: [AdminFeedbacksController],
			providers: [AdminFeedbacksService],
			imports: [FeedbacksModule.forFeature()],
		}
	}
}

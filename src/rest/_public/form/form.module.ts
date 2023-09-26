import { DynamicModule, Module } from '@nestjs/common'
import { PublicFormController } from './form.controller'
import { PublicFormService } from './form.service'
import { MailerModule } from 'src/libs/mailer/mailer.module'

@Module({})
export class PublicFormModule {
	static forRoot(): DynamicModule {
		return {
			module: PublicFormModule,
			controllers: [PublicFormController],
			providers: [PublicFormService],
			imports: [MailerModule.forFeature()],
		}
	}
}

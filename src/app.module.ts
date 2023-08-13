import { Module } from '@nestjs/common'

import {
	getDatabaseConfig,
	getFilesStorageConfig,
	getGoogleConfig,
	getJwtConfig,
	getMailerConfig,
	getRedisConfig,
} from './config'
import { DOMAIN_MODULES } from './domain'
import { DatabaseModule } from './libs/database'
import { JwtModule } from './libs/jwt'
import { CommandModule } from 'nestjs-command'
import { REST_MODULES } from './rest'
import { RedisModule } from './libs/redis'
import { FilesStorageModule } from './libs/files-storage'
import { MailerModule } from './libs/mailer/mailer.module'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { GoogleModule } from './libs/google/google.module'
import { SmsModule } from './libs/sms/sms.module'
import { getEnv, stringToBoolean } from './shared'
import { GusRegionModule } from './libs/gus-region/gus-region.module'
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data'
@Module({
	imports: [
		CommandModule,
		EventEmitterModule.forRoot(),
		JwtModule.forRoot(getJwtConfig()),
		DatabaseModule.forRoot(...getDatabaseConfig()),
		RedisModule.forRoot(getRedisConfig()),
		FilesStorageModule.forRoot(getFilesStorageConfig()),
		MailerModule.forRoot(getMailerConfig()),
		SmsModule.forRoot({ test: stringToBoolean(getEnv('SMS_TEST_MODE')) }),
		GusRegionModule.forRoot({ apiKey: getEnv('GUS_API_REGON') }),
		GoogleModule.forRoot(getGoogleConfig()),
		NestjsFormDataModule.config({ storage: MemoryStoredFile }),
		...DOMAIN_MODULES(),
		...REST_MODULES(),
	],
})
export class AppModule {}

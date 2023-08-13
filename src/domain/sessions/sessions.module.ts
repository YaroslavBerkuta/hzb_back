import { DynamicModule, Global, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs/database'
import { JwtModule } from 'src/libs/jwt'
import { RedisModule } from 'src/libs/redis'
import { provideClass } from 'src/shared'
import { Session } from './entities'
import { SESSIONS_GUARDS } from './guards'
import { SessionsService, SESSIONS_SERVICES } from './services'
import { SESSIONS_SERVICE, SESSION_REPOSITORY } from './typing/consts'

@Global()
@Module({})
export class SessionsModule {
	static getProviders() {
		return [
			provideEntity(SESSION_REPOSITORY, Session),
			provideClass(SESSIONS_SERVICE, SessionsService),
			...SESSIONS_SERVICES,
			...SESSIONS_GUARDS,
		]
	}
	static forRoot(): DynamicModule {
		return {
			module: SessionsModule,
			imports: [JwtModule.forFeature(), RedisModule.forFeature()],
			providers: SessionsModule.getProviders(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: SessionsModule,
			imports: [JwtModule.forFeature(), RedisModule.forFeature()],
			providers: SessionsModule.getProviders(),
			exports: [SESSIONS_SERVICE],
		}
	}
}

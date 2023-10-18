import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs/database'
import { provideClass } from 'src/shared'
import { SessionsModule } from '../sessions/sessions.module'
import { User } from './entities'
import { UsersPasswordsService, UsersService, USERS_SERVICES } from './services'
import { IUsersModuleOptions } from './typing'
import { USER_SEEDS } from './seeders/index'
import {
	PASSWORD_HASH_SALT,
	USERS_PASSWORDS_SERVICE,
	USERS_REPOSITORY,
	USERS_SERVICE,
} from './typing/consts'

@Module({})
export class UsersModule {
	static options: IUsersModuleOptions

	static getProviders() {
		return [
			provideEntity(USERS_REPOSITORY, User),
			provideClass(USERS_SERVICE, UsersService),
			provideClass(USERS_PASSWORDS_SERVICE, UsersPasswordsService),
			...USERS_SERVICES,
			{
				provide: PASSWORD_HASH_SALT,
				useValue: UsersModule.options.passwordHashSalt,
			},
		]
	}

	static imports() {
		return [SessionsModule.forFeature()]
	}

	static forRoot(options: IUsersModuleOptions): DynamicModule {
		UsersModule.options = options
		return {
			module: UsersModule,
			providers: [...UsersModule.getProviders(), ...USER_SEEDS],
			imports: UsersModule.imports(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: UsersModule,
			providers: [...UsersModule.getProviders()],
			imports: UsersModule.imports(),
			exports: [USERS_SERVICE, USERS_PASSWORDS_SERVICE, USERS_REPOSITORY],
		}
	}
}

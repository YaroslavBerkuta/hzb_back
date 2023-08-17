import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs/database'
import { CLIENTS_REPOSITORY, CLIENTS_SERVICES, CLIENTS_TRANSLATES_REPOSITORY } from './typing'
import { Client, ClientTranslate } from './entities'
import { provideClass } from 'src/shared'
import { ClientsService } from './services/client.service'

@Module({})
export class ClientsModule {
	static getProviders() {
		return [
			provideEntity(CLIENTS_REPOSITORY, Client),
			provideEntity(CLIENTS_TRANSLATES_REPOSITORY, ClientTranslate),
			provideClass(CLIENTS_SERVICES, ClientsService),
		]
	}

	static imports() {
		return []
	}

	static forRoot(): DynamicModule {
		return {
			module: ClientsModule,
			providers: this.getProviders(),
			imports: this.imports(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: ClientsModule,
			providers: this.getProviders(),
			imports: this.imports(),
			exports: [CLIENTS_REPOSITORY],
		}
	}
}

import * as dotenv from 'dotenv'
dotenv.config()

import { NestFactory } from '@nestjs/core'
import { CommandModule, CommandService } from 'nestjs-command'
import { AppModule } from './app.module'

// eslint-disable-next-line @typescript-eslint/no-var-requires

async function bootstrap() {
	const app = await NestFactory.createApplicationContext(AppModule, {
		logger: ['log', 'debug', 'error', 'warn', 'verbose'],
	})

	try {
		await app.select(CommandModule).get(CommandService).exec()
		await app.close()
	} catch (error) {
		console.error(error)
		await app.close()
		process.exit(1)
	}
}

bootstrap()

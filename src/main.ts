import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as basicAuth from 'express-basic-auth'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger } from '@nestjs/common'
import { DomainExceptionsFilter } from './shared'


async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.enableCors({
		origin: '*',
	})

	app.useGlobalFilters(new DomainExceptionsFilter(new Logger()))

	app.use(
		'/docs',
		basicAuth({
			challenge: true,
			users: {
				admin: '1065473nbgl',
			},
		}),
	)

	const config = new DocumentBuilder()
		.setTitle('HZB Api')
		.setDescription('API description')
		.setVersion('1.1')
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('docs', app, document)

	await app.listen(3000)
}
bootstrap()

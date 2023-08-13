import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as basicAuth from 'express-basic-auth'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger, ValidationPipe } from '@nestjs/common'
import { DomainExceptionsFilter } from './shared'
import { json, urlencoded } from 'express'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// app.useGlobalPipes(
	// 	new ValidationPipe({
	// 		transform: true,
	// 		transformOptions: { excludeExtraneousValues: true },
	// 	}),
	// )

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
		.setTitle('Joy-Job Api')
		.setDescription('API description')
		.setVersion('1.0')
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('docs', app, document)

	// app.use(json({ limit: '50mb' }))
	// app.use(urlencoded({ extended: true, limit: '100mb' }))

	await app.listen(3000)
}
bootstrap()

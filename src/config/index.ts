import { DatabaseModule } from 'src/libs/database'
import { IFilesStorageOptions } from 'src/libs/files-storage/interfaces'
import { IGoogleModuleOptions } from 'src/libs/google/typing'
import { IMailerModuleOptions } from 'src/libs/mailer/interfaces'
import { IRedisModuleOptions } from 'src/libs/redis/interfaces'
import { getEnv, stringToBoolean } from 'src/shared'
import fs = require('fs')
import path = require('path')
import { ENTITIES } from './entities.config'

export const getDatabaseConfig = (): Parameters<(typeof DatabaseModule)['forRoot']> => {
	const sslEnabled = stringToBoolean(getEnv('DATABASE_SSL'))
	const options: any = {
		type: 'postgres',
		host: process.env.DATABASE_HOST,
		port: Number(process.env.DATABASE_PORT),
		username: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASS,
		database: process.env.DATABASE_DB,
		synchronize: true,
		ssl: null,
	}
	if (sslEnabled)
		options.ssl = {
			ca: fs.readFileSync(path.join(__dirname, '../../db.crt')),
		}

	return [options, ENTITIES]
}

export const getJwtConfig = () => {
	return { jwtKey: getEnv('JWT_KEY'), paylodKey: getEnv('JWT_PAYLOAD_KEY') }
}

export const getRedisConfig = (): IRedisModuleOptions => {
	return {
		port: Number(getEnv('REDIS_PORT')),
		host: getEnv('REDIS_HOST'),
		password: getEnv('REDIS_PASS'),
	}
}

export const getFilesStorageConfig = (): IFilesStorageOptions => {
	return {
		host: getEnv('MINIO_HOST'),
		port: Number(getEnv('MINIO_PORT')),
		accessKey: getEnv('MINIO_ACCESS_KEY'),
		secretKey: getEnv('MINIO_SECRET_KEY'),
		urlPrefix: getEnv('MINIO_URL_PREFIX'),
		bucket: getEnv('MINIO_BUCKET') || 'files',
		privateBucket: getEnv('MINIO_PRIVATE_BUCKET'),
	}
}

export const getMailerConfig = (): IMailerModuleOptions => {
	const mod = getEnv('MAILER_MODE')
	if (mod === 'test') return { test: true }
	if (mod === 'smtp')
		return {
			test: false,
			smtp: {
				domain: getEnv('MAILER_DOMAIN'),
				port: Number(getEnv('MAILER_PORT')),
				password: getEnv('MAILER_PASSWORD'),
				login: getEnv('MAILER_LOGIN'),
				protocol: getEnv('MAILER_PROTOCOL'),
				secure: stringToBoolean(getEnv('MAILER_SECURE')),
			},
		}
	if (mod === 'sendgrid') {
		return {
			test: false,
			sendGrid: {
				apiKey: getEnv('SENDGRID_API_KEY'),
			},
		}
	}
}

export const getGoogleConfig = (): IGoogleModuleOptions => {
	return {
		apiKey: getEnv('GOOGLE_API_KEY'),
	}
}

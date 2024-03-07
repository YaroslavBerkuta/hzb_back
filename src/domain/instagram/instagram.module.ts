import { DynamicModule, Module } from '@nestjs/common'
import { InstagramController } from './instagram.controller'
import { GalleryModule } from '../galleries/gallery.module'
import { provideEntity } from 'src/libs/database'
import {  Instagram } from './entities'
import { provideClass } from 'src/shared'
import { INSTAGRAM_REPOSITORY, INSTAGRAM_SERVICE } from './types'
import { InstagramService } from './instagram.service'

@Module({})
export class InstagramModule {
	static getProviders() {
		return [
			provideEntity(INSTAGRAM_REPOSITORY, Instagram),
			provideClass(INSTAGRAM_SERVICE, InstagramService),
		]
	}

	static forRoot(): DynamicModule {
		return {
			module: InstagramModule,
			controllers: [InstagramController],
			providers: this.getProviders(),
			imports: [GalleryModule.forFeature()],
		}
	}
}

import { DynamicModule, Module } from '@nestjs/common'
import { ProjectsModule } from 'src/domain/projects/projects.module'
import { PublicProjectsController } from './projects.controller'
import { PublicProjectsService } from './projects.service'
import { GalleryModule } from 'src/domain/galleries/gallery.module'

@Module({})
export class PublicProjectsModule {
	static forRoot(): DynamicModule {
		return {
			module: PublicProjectsModule,
			controllers: [PublicProjectsController],
			providers: [PublicProjectsService],
			imports: [ProjectsModule.forFeature(), GalleryModule.forFeature()],
		}
	}
}

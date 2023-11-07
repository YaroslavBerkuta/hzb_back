import { DynamicModule, Module } from '@nestjs/common'
import { AdminProjectsController } from './project.controller'
import { AdminProjectsService } from './project.service'
import { ProjectsModule } from 'src/domain/projects/projects.module'
import { GalleryModule } from 'src/domain/galleries/gallery.module'

@Module({})
export class AdminProjectsModule {
	static forRoot(): DynamicModule {
		return {
			module: AdminProjectsModule,
			controllers: [AdminProjectsController],
			providers: [AdminProjectsService],
			imports: [ProjectsModule.forFeature(), GalleryModule.forFeature()],
		}
	}
}

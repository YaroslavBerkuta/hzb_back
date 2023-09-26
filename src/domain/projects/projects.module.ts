import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs/database'
import { PROJECTS_REPOSITORY, PROJECTS_SERVICES, PROJECTS_TRANSLATES_REPOSITORY } from './typing'
import { Project, ProjectTranslate } from './entities'
import { provideClass } from 'src/shared'
import { ProjectService } from './services/project.service'
import { PROJECT_SEEDS } from './seeders'

@Module({})
export class ProjectsModule {
	static getProviders() {
		return [
			provideEntity(PROJECTS_TRANSLATES_REPOSITORY, ProjectTranslate),
			provideEntity(PROJECTS_REPOSITORY, Project),
			provideClass(PROJECTS_SERVICES, ProjectService),
		]
	}

	static imports() {
		return []
	}

	static forRoot(): DynamicModule {
		return {
			module: ProjectsModule,
			providers: [...this.getProviders(), ...PROJECT_SEEDS],
			imports: this.imports(),
		}
	}
	static forFeature(): DynamicModule {
		return {
			module: ProjectsModule,
			providers: this.getProviders(),
			exports: [PROJECTS_SERVICES],
			imports: this.imports(),
		}
	}
}

import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs/database'
import { NEWS_REPOSITORY, NEWS_SERVICES, NEWS_TRANSLATES_REPOSITORY } from './typing'
import { News, NewsTranslates } from './entities'
import { provideClass } from 'src/shared'
import { NewsService } from './services/news.service'

@Module({})
export class NewsModule {
	static getPrividers() {
		return [
			provideEntity(NEWS_REPOSITORY, News),
			provideEntity(NEWS_TRANSLATES_REPOSITORY, NewsTranslates),
			provideClass(NEWS_SERVICES, NewsService),
		]
	}

	static imports() {
		return []
	}

	static forRoot(): DynamicModule {
		return {
			module: NewsModule,
			providers: this.getPrividers(),
			imports: this.imports(),
		}
	}

	static forFeature(): DynamicModule {
		return {
			module: NewsModule,
			providers: this.getPrividers(),
			exports: [],
		}
	}
}

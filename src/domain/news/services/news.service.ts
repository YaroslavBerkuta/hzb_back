import { Inject, Injectable } from '@nestjs/common'
import {
	NEWS_REPOSITORY,
	NEWS_TRANSLATES_REPOSITORY,
	TNewsRepository,
	TNewsTranslatesRepository,
} from '../typing'

@Injectable()
export class NewsService {
	@Inject(NEWS_REPOSITORY) private readonly newsRepository: TNewsRepository
	@Inject(NEWS_TRANSLATES_REPOSITORY)
	private readonly newsTranslateRepository: TNewsTranslatesRepository
}

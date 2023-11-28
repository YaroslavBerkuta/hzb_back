import { Inject, Injectable } from '@nestjs/common'
import {
	ICreateNewsPayload,
	INewsServices,
	NEWS_REPOSITORY,
	NEWS_TRANSLATES_REPOSITORY,
	TNewsRepository,
	TNewsTranslatesRepository,
} from '../typing'

@Injectable()
export class NewsService implements INewsServices {
	@Inject(NEWS_REPOSITORY) private readonly newsRepository: TNewsRepository
	@Inject(NEWS_TRANSLATES_REPOSITORY)
	private readonly newsTranslateRepository: TNewsTranslatesRepository

	public async create(payload: ICreateNewsPayload) {
		const news = await this.newsRepository.save(payload)
		await this.putTranslations(news.id, payload.translations, false)
		return news
	}

	private async putTranslations(newsId: number, translates: any, clearPrevios = true) {
		if (clearPrevios) await this.newsTranslateRepository.delete({ newsId })
		const toSave = translates.map(it => ({
			lang: it.lang,
			name: it.name,
			newsId,
			description: it.description,
		}))

		await this.newsTranslateRepository.insert(toSave)
		return toSave
	}

	public async update(id: number, payload: ICreateNewsPayload) {
		await this.putTranslations(id, payload.translations, true)
	}
}

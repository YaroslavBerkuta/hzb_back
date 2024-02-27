import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import {
	CATEGORY_REPOSITORY,
	CATEGORY_TRANSLATES_REPOSITORY,
	ICategory,
	ICategoryServices,
	ICreateCategoryPayload,
	TCategory,
	TCategoryTranslate,
} from '../typing'
import { CategoryType } from '../typing/enums'

@Injectable()
export class CategoryService implements ICategoryServices {
	@Inject(CATEGORY_REPOSITORY) private readonly categoryRepository: TCategory
	@Inject(CATEGORY_TRANSLATES_REPOSITORY)
	private readonly categoryTranslateRepository: TCategoryTranslate

	async create(payload: ICreateCategoryPayload): Promise<ICategory> {
		try {
			const exist = await this.categoryRepository.findOne({ where: { key: payload.key } })

			if (exist) {
				throw new BadRequestException('Категорія з таким ключем вже існує')
			}

			const category = await this.categoryRepository.save(payload)
			await this.putTranslations(category.id, payload.translations, false)
			return category
		} catch (error) {
			console.log('create category error:', error)
			throw new Error(error)
		}
	}

	async update(id: number, payload: any): Promise<void> {
		try {
			await this.categoryRepository.update(id, {
				key: payload.key,
				parentId: payload.parentId,
			})
			await this.putTranslations(id, payload.translations, true)
		} catch (error) {
			console.log('update category error:', error)
			throw new Error(error)
		}
	}

	private async putTranslations(
		categoryId: number,
		translates: any['translations'],
		clearPrevios = true,
	) {
		try {
			if (clearPrevios) await this.categoryTranslateRepository.delete({ categoryId })
			const toSave = translates.map(it => ({
				lang: it.lang,
				name: it.name,
				categoryId,
				description: it.description,
			}))

			await this.categoryTranslateRepository.insert(toSave)
			return toSave
		} catch (error) {
			console.log('error:', error)
			throw new Error(error)
		}
	}
}

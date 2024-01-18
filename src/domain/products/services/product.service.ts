import { Inject, Injectable } from '@nestjs/common'
import {
	PRODUCTS_REPOSITORY,
	PRODUCTS_TO_CATEGORY,
	PRODUCTS_TRANSLATES_REPOSITORY,
} from '../typing/consts'
import {
	ICreateProductPayload,
	IProductService,
	TProductTranslateRepository,
	TProductsRepository,
	TProductsToCategory,
} from '../typing'

@Injectable()
export class ProductService implements IProductService {
	@Inject(PRODUCTS_REPOSITORY) private readonly productRepository: TProductsRepository
	@Inject(PRODUCTS_TRANSLATES_REPOSITORY)
	private readonly productTranslateRepository: TProductTranslateRepository
	@Inject(PRODUCTS_TO_CATEGORY) private readonly productToCategory: TProductsToCategory

	public async create(payload: ICreateProductPayload) {
		try {
			const product = await this.productRepository.save(payload)
			if (payload.categoryId) {
				await this.productToCategory.save({
					categoryId: payload.categoryId,
					productId: product.id,
				})
			}
			await this.putTranslations(product.id, payload.translations, false)
			return product
		} catch (error) {
			console.log('error:', error)
		}
	}

	public async update(id: number, payload: Partial<ICreateProductPayload>) {
		try {
			await this.putTranslations(id, payload.translations, true)

			if (payload.categoryId) {
				await this.productToCategory.delete({ productId: id })
				await this.productToCategory.save({
					categoryId: payload.categoryId,
					productId: id,
				})
			}
		} catch (error) {
			console.log('error:', error)
		}
	}

	private async putTranslations(
		productId: number,
		translates: ICreateProductPayload['translations'],
		clearPrevios = true,
	) {
		try {
			if (clearPrevios) await this.productTranslateRepository.delete({ productId })
			const toSave = translates.map(it => ({
				lang: it.lang,
				name: it.name,
				info: it.info,
				description: it.description,
				previewHtml: it.previewHtml,
				productId,
			}))

			await this.productTranslateRepository.insert(toSave)
			return toSave
		} catch (error) {
			console.log('error:', error)
			throw new Error(error)
		}
	}
}

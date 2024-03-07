import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { INSTAGRAM_REPOSITORY, TInstagramRepository } from './types'
import { IPagination, paginateAndGetMany } from 'src/shared'
import { GALLERY_SERVICE } from '../galleries/consts'
import { IGalleryService } from '../galleries/interface'

@Injectable()
export class InstagramService {
	@Inject(INSTAGRAM_REPOSITORY) private readonly instagramRepository: TInstagramRepository
	@Inject(GALLERY_SERVICE) private readonly galleryService: IGalleryService

	public async store(payload: any) {
		try {
			const post = await this.instagramRepository.save({ link: payload.link })
			return post
		} catch (error) {
			console.log('error:', error)
		}
	}

	public async update(id: number, payload: any) {
		try {
			const exist = await this.instagramRepository.findOne({ where: { id } })

			if (!exist) {
				throw new BadRequestException('post not found')
			}

			await this.instagramRepository.update(id, payload)
		} catch (error) {
			console.log('error:', error)
		}
	}

	public async del(id: number) {
		return this.instagramRepository.delete(id)
	}

	public async getList(pagination: IPagination) {
		const query = this.instagramRepository.createQueryBuilder('it').orderBy('it.createdAt')

		const { items, count } = await paginateAndGetMany(query, pagination, 'it')

		await Promise.all(
			items.map(async (it, index, arr: any) => {
				arr[index].cover = await this.galleryService.get({
					parentId: it.id,
					parentTable: 'instagram',
				})
			}),
		)

		return { items, count }
	}
}

import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { FinishFileUpload, RemoveFilesParamsDto, StoreFileDto } from './dto'

import * as randomstring from 'randomstring'

import { In } from 'typeorm'
import { GALLERY_REPOSITORY, GALLERY_SERVICE } from 'src/domain/galleries/consts'
import {
	IGalleriesRepository,
	IGalleryService,
	IStoreGalleryPayload,
} from 'src/domain/galleries/interface'
import { FileStorageService } from 'src/libs/files-storage'
import { REDIS_SERVICE } from 'src/libs/redis/consts'
import { IRedisService } from 'src/libs/redis/interfaces'

@Injectable()
export class FilesStoreService {
	@Inject(GALLERY_SERVICE) galleryService: IGalleryService
	@Inject(GALLERY_REPOSITORY) galleryRepository: IGalleriesRepository
	@Inject(REDIS_SERVICE) private readonly redisService: IRedisService

	constructor(
		private readonly filesStorageService: FileStorageService, // private readonly redisService: RedisService,
	) {}

	public async getLinkToUploadFile(dto: StoreFileDto) {
		try {
			const { presignedUrl, resultUrl } =
				await this.filesStorageService.getPresignedUrlForPutObject(
					dto.directory,
					dto.filename,
				)

			const uploadId = randomstring.generate({
				length: 24,
				charset: 'alphabetic',
				capitalization: 'uppercase',
			})

			await this.redisService.set(
				uploadId,
				JSON.stringify({
					resultUrl,
					directory: dto.directory,
					parentId: dto.parentId,
					name: dto.filename,
					mimetype: dto.type,
				}),
				60 * 60 * 2,
			)

			return {
				presignedUrl,
				uploadId,
			}
		} catch (e) {
			console.log('Error', e)
			throw e
		}
	}

	public async finishUploadFile(dto: FinishFileUpload) {
		const _data = await this.redisService.get(dto.uploadId)
		if (!_data) throw new NotFoundException('Upload id invalid')

		const data = JSON.parse(_data)

		const payload: IStoreGalleryPayload = {
			fileUrl: data.resultUrl,
			parentId: data.parentId,
			fileName: data.name,
			parentTable: '',
			mimetype: data.mimetype,
		}

		switch (data.directory) {
			case 'news': {
				payload.parentTable = 'news'
				break
			}
			case 'projects': {
				payload.parentTable = 'project'
				break
			}
			case 'productions': {
				payload.parentTable = 'productions'
				break
			}
			case 'awards': {
				payload.parentTable = 'awards'
				break
			}
			case 'quality': {
				payload.parentTable = 'quality'
				break
			}
			case 'labolatory': {
				payload.parentTable = 'labolatory'
				break
			}
			case 'partner': {
				payload.parentTable = 'partner'
				break
			}
			case 'products': {
				payload.parentTable = 'products'
				break
			}
			case 'productsTable': {
				payload.parentTable = 'productsTable'
				break
			}
			case 'categoryCover': {
				payload.parentTable = 'categoryCover'
				break
			}
			case 'categoryPrice': {
				payload.parentTable = 'categoryPrice'
				break
			}
			case 'categoryCatalog': {
				payload.parentTable = 'categoryCatalog'
				break
			}
			case 'instagram': {
				payload.parentTable = 'instagram'
				break
			}
			case 'feedbacks': {
				payload.parentTable = 'feedbacks'
				break
			}
		}
		if (payload.parentTable) {
			await this.galleryService.store(payload)
		}

		await this.redisService.del(dto.uploadId)
	}

	public async removeFiles(dto: RemoveFilesParamsDto) {
		const ids = Object.values(dto)
		console.log('ids:', ids)
		const items = await this.galleryRepository.find({ id: In(ids) })

		await Promise.all(
			items.map(async it => {
				await this.galleryService.delete(it.id)
			}),
		)
	}
}

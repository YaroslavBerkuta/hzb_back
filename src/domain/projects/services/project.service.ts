import { Inject, Injectable } from '@nestjs/common'
import {
	ICreateProjectPayload,
	ICreateProjectTranslatePayload,
	IProjectService,
	PROJECTS_DETAILS_REPOSITORY,
	PROJECTS_REPOSITORY,
	PROJECTS_TRANSLATES_REPOSITORY,
	TProjectDetailRepository,
	TProjectRepository,
	TProjectTranslateRepository,
} from '../typing'
import _, { find } from 'lodash'

@Injectable()
export class ProjectService implements IProjectService {
	@Inject(PROJECTS_REPOSITORY) private readonly projectRepository: TProjectRepository
	@Inject(PROJECTS_TRANSLATES_REPOSITORY)
	private readonly projectTranslateRepository: TProjectTranslateRepository
	@Inject(PROJECTS_DETAILS_REPOSITORY)
	private readonly projectDetailRepository: TProjectDetailRepository

	public async create(payload: ICreateProjectPayload) {
		try {
			const project = await this.projectRepository.save(payload)
			await this.putTranslations(project.id, payload.translations, false)

			return project
		} catch (error) {
			console.log('ProjectService create error:', error)
			throw new Error('error')
		}
	}

	private async putTranslations(
		projectId: number,
		translates: ICreateProjectTranslatePayload[],
		clearPrevios = true,
	) {
		try {
			if (clearPrevios) await this.projectTranslateRepository.delete({ projectId })
			const toSave = translates.map(it => ({
				lang: it.lang,
				name: it.name,
				projectId,
				sity: it.sity,
			}))

			const test = await this.projectTranslateRepository.save(toSave)

			for await (let it of test) {
				const data = find(translates, { lang: it.lang })
				await this.saveDetail(it.id, true, data.info)
			}

			return toSave
		} catch (error) {
			console.log('translate project error:', error)
			throw new Error('error')
		}
	}

	private async saveDetail(projectTranslateId: number, clearPrevios = true, data: any) {
		if (clearPrevios) await this.projectDetailRepository.delete({ projectTranslateId })

		const toSave = data.map(it => ({
			title: it.title,
			description: it.description,
			projectTranslateId,
		}))

		await this.projectDetailRepository.insert(toSave)
		return
	}

	public async update(id: number, payload: ICreateProjectPayload) {
		try {
			await this.projectRepository.update(id, { years: payload.years })
			await this.putTranslations(id, payload.translations, true)
		} catch (error) {
			console.log('project error:', error)
			throw new Error('error')
		}
	}
}

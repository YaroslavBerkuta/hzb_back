import { Inject, Injectable } from '@nestjs/common'
import {
	ICreateProjectPayload,
	ICreateProjectTranslatePayload,
	IProjectService,
	PROJECTS_REPOSITORY,
	PROJECTS_TRANSLATES_REPOSITORY,
	TProjectRepository,
	TProjectTranslateRepository,
} from '../typing'

@Injectable()
export class ProjectService implements IProjectService {
	@Inject(PROJECTS_REPOSITORY) private readonly projectRepository: TProjectRepository
	@Inject(PROJECTS_TRANSLATES_REPOSITORY)
	private readonly projectTranslateRepository: TProjectTranslateRepository

	public async create(payload: ICreateProjectPayload) {
		try {
			const project = await this.projectRepository.save(payload)
			await this.putTranslations(project.id, payload.translations, false)
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
				description: it.description,
			}))

			await this.projectTranslateRepository.insert(toSave)
			return toSave
		} catch (error) {
			console.log('translate project error:', error)
			throw new Error('error')
		}
	}
}

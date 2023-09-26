import { Inject, Injectable } from '@nestjs/common'
import { Seeder } from 'src/shared'
import { IProjectService, PROJECTS_SERVICES } from '../typing'
import { faker } from '@faker-js/faker'
import { Lang } from 'src/shared/enums'

@Injectable()
export class ProjectSeed extends Seeder {
	@Inject(PROJECTS_SERVICES) private readonly projectService: IProjectService
	protected name = 'Project'
	protected async seed(): Promise<void> {
		const mock = [
			{
				translations: [
					{
						lang: Lang.en,
						name: 'Project 1',
						description: 'Project 1 descriprion',
					},
					{
						lang: Lang.uk,
						name: 'Проект 1',
						description: 'Проект 1 опис',
					},
				],
			},
			{
				translations: [
					{
						lang: Lang.en,
						name: 'Project 2',
						description: 'Project 2 descriprion',
					},
					{
						lang: Lang.uk,
						name: 'Проект 2',
						description: 'Проект 2 опис',
					},
				],
			},
			{
				translations: [
					{
						lang: Lang.en,
						name: 'Project 3',
						description: 'Project 3 descriprion',
					},
					{
						lang: Lang.uk,
						name: 'Проект 3',
						description: 'Проект 3 опис',
					},
				],
			},
		]
		try {
			for (let item of mock) {
				await this.projectService.create({
					translations: item.translations,
				})
			}
		} catch (error) {
			console.log(error)
		}
	}
}

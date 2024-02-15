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
						sity: 'Project 1 descriprion',
					},
					{
						lang: Lang.ua,
						name: 'Проект 1',
						sity: 'Проект 1 опис',
					},
				],
			},
			{
				translations: [
					{
						lang: Lang.en,
						name: 'Project 2',
						sity: 'Project 2 descriprion',
					},
					{
						lang: Lang.ua,
						name: 'Проект 2',
						sity: 'Проект 2 опис',
					},
				],
			},
			{
				translations: [
					{
						lang: Lang.en,
						name: 'Project 3',
						sity: 'Project 3 descriprion',
					},
					{
						lang: Lang.ua,
						name: 'Проект 3',
						sity: 'Проект 3 опис',
					},
				],
			},
		]
		try {
			for (let item of mock) {
				await this.projectService.create({
					years: '2012-2018',
					translations: item.translations,
				})
			}
		} catch (error) {
			console.log(error)
		}
	}
}

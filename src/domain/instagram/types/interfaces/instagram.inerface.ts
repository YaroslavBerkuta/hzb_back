import { Repository } from 'typeorm'

export interface IInstagram {
	id: number
	link: string

	createdAt?: string
	updatedAt?: string
}

export type TInstagramRepository = Repository<IInstagram>

import { Lang } from 'src/shared/enums'

export interface IAwards {
	id: number

	translations?: IAwardTranslates[]

	createdAt?: string
	updatedAt?: string
}

export interface IAwardTranslates {
	id: number

	lang: Lang
	name: string
	description: string
	awardId: number
	award?: IAwards

	createdAt?: string
	updatedAt?: string
}

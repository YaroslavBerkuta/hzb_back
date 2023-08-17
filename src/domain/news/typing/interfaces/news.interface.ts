import { Lang } from "src/shared/enums"

export interface INews {
	id: number

	translations?: INewsTranslates[]

	createdAt?: string
	updatedAt?: string
}

export interface INewsTranslates {
	id: number

    lang: Lang
    name: string
    description: string
    newsId: number

	createdAt?: string
	updatedAt?: string
}

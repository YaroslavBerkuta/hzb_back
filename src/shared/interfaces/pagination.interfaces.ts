export interface IPagination {
	limit: number
	page?: number
	sortField?: string
	sort?: 'ASC' | 'DESC'
	skip?: number
	searchString?: string
}

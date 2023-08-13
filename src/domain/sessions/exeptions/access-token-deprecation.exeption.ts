import { Exeption } from 'src/shared'

export class AccessTokenDeprecation extends Exeption {
	protected key = 'accessTokenDeprecation'

	constructor() {
		super('Access token deprecated')
	}
}

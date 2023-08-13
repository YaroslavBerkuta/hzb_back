import { Exeption } from 'src/shared'

export class UserAlreadyExsitExeption extends Exeption {
	protected key = 'userAlreadyExist'
	constructor() {
		super('User already exist')
	}
}

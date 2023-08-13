import PhoneNumber from 'awesome-phonenumber'
import { getNumericString } from './numeric-strings.helpers'

export const formatPhoneNumber = (phoneNumber: string) => {
	const numericString = `+${getNumericString(phoneNumber)}`

	return new PhoneNumber(numericString).getNumber('e164')
}

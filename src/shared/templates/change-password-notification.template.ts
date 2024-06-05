interface IParams {
	linkToWeb: string
	phoneNumber: string
	login: string
	password: string
}
export const getChangePasswordNotificationHTML = (params: IParams) => {
	return `
  <div>
    <p>getChangePasswordNotificationHTML</p>
  </div>
`
}

export const getChangePasswordNotificationText = (params: IParams) => {
	return `
  getChangePasswordNotificationText
  `
}

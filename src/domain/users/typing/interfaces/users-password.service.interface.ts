export interface IUsersPasswordsService {
	compareUserPasswords(userId: number, password: string): Promise<boolean>
	changeUserPassword(userId: number, newPassword: string): Promise<void>
}

import { Exeption } from 'src/shared';

export class UserNotFoundExeption extends Exeption {
  protected key = 'userNotFound';
  constructor() {
    super('User not found');
  }
}

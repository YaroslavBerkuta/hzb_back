import { Exeption } from 'src/shared';

export class WrongRefreshTokenException extends Exeption {
  protected key = 'wrongRefreshToken';

  constructor() {
    super('Refresh token is wrong');
  }
}

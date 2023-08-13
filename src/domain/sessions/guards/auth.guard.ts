import {
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from 'src/libs/jwt/services'
import { removeBearerFromToken } from 'src/shared'
import { AccessTokenDeprecation } from '../exeptions'
import { ISessionsService, SESSIONS_SERVICE } from '../typing'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		@Inject(SESSIONS_SERVICE)
		private readonly sessionsService: ISessionsService,
	) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const { headers } = request
		const token = removeBearerFromToken(headers.authorization)

		if (!token) throw new UnauthorizedException()

		const deprecated = await this.sessionsService.checkTokenDeprecation(token)

		if (deprecated) throw new AccessTokenDeprecation()

		const decoded = this.jwtService.decodeToken(token)

		if (!decoded) throw new UnauthorizedException()

		request.userId = decoded.id
		request.role = decoded.role
		request.sessionId = decoded.sessionId
		return true
	}
}

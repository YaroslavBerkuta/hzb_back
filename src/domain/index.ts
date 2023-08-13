import { SessionsModule } from './sessions/sessions.module'

export const DOMAIN_MODULES = () => [SessionsModule.forRoot()]

import { getEnv } from 'src/shared'
import { ClientsModule } from './clients/clients.module'
import { SessionsModule } from './sessions/sessions.module'
import { UsersModule } from './users/users.module'
import { NewsModule } from './news/news.module'
import { GalleryModule } from './galleries/gallery.module'

export const DOMAIN_MODULES = () => [
	SessionsModule.forRoot(),
	UsersModule.forRoot({ passwordHashSalt: getEnv('LOCAL_HASH_SALT') }),
	ClientsModule.forRoot(),
	NewsModule.forRoot(),
	GalleryModule.forRoot(),
]

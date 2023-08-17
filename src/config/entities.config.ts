import { CLIENTS_ENTITIES } from 'src/domain/clients/entities'
import { NEWS_ETITIES } from 'src/domain/news/entities'
import { SESSIONS_ENTITIES } from 'src/domain/sessions/entities'
import { USERS_ENTITIES } from 'src/domain/users/entities'

export const ENTITIES = [
	...USERS_ENTITIES,
	...SESSIONS_ENTITIES,
	...CLIENTS_ENTITIES,
	...NEWS_ETITIES,
]

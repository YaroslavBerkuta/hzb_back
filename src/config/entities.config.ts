import { CLIENTS_ENTITIES } from 'src/domain/clients/entities'
import { GALLERIES_ENTITIES } from 'src/domain/galleries/entities'
import { NEWS_ETITIES } from 'src/domain/news/entities'
import { PROJECT_ENTITY } from 'src/domain/projects/entities'
import { SESSIONS_ENTITIES } from 'src/domain/sessions/entities'
import { USERS_ENTITIES } from 'src/domain/users/entities'

export const ENTITIES = [
	...USERS_ENTITIES,
	...SESSIONS_ENTITIES,
	...CLIENTS_ENTITIES,
	...NEWS_ETITIES,
	...GALLERIES_ENTITIES,
	...PROJECT_ENTITY,
]

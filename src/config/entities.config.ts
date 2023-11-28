import { AWARDS_ENTITY } from 'src/domain/awards/entities'
import { CLIENTS_ENTITIES } from 'src/domain/clients/entities'
import { DISTRIBUTIONS_ENTITY } from 'src/domain/distributors/entities'
import { GALLERIES_ENTITIES } from 'src/domain/galleries/entities'
import { LABOLATORY_ENTITIES } from 'src/domain/labolatory/entities'
import { NEWS_ETITIES } from 'src/domain/news/entities'
import { PRODUCTIONS_ENTITY } from 'src/domain/productions/entities'
import { PROJECT_ENTITY } from 'src/domain/projects/entities'
import { QUALITY_ENTITIES } from 'src/domain/quality/entities'
import { SESSIONS_ENTITIES } from 'src/domain/sessions/entities'
import { USERS_ENTITIES } from 'src/domain/users/entities'

export const ENTITIES = [
	...USERS_ENTITIES,
	...SESSIONS_ENTITIES,
	...CLIENTS_ENTITIES,
	...NEWS_ETITIES,
	...GALLERIES_ENTITIES,
	...PROJECT_ENTITY,
	...DISTRIBUTIONS_ENTITY,
	...PRODUCTIONS_ENTITY,
	...AWARDS_ENTITY,
	...QUALITY_ENTITIES,
	...LABOLATORY_ENTITIES,
]

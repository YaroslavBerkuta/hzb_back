import { Repository } from 'typeorm'
import { IClient, IClientTranslate } from './client.interface'

export type TClientRepository = Repository<IClient>
export type TClientTranslatesRepository = Repository<IClientTranslate>

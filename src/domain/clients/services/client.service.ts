import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import {
	CLIENTS_REPOSITORY,
	CLIENTS_TRANSLATES_REPOSITORY,
	IClientCreatePayload,
	IClientService,
	IClientTranslatePayload,
	IClientUpdatePayload,
} from '../typing'
import {
	TClientRepository,
	TClientTranslatesRepository,
} from '../typing/interfaces/client-repository.interface'
import { isEmpty, isNil, omit, omitBy } from 'lodash'

@Injectable()
export class ClientsService implements IClientService {
	@Inject(CLIENTS_REPOSITORY) private readonly clientRepository: TClientRepository
	@Inject(CLIENTS_TRANSLATES_REPOSITORY)
	private readonly clientTranslateRepository: TClientTranslatesRepository

	public async create(payload: IClientCreatePayload) {
		const client = await this.clientRepository.save(payload)

		await this.putTranslations(client.id, payload.translations)
		return client
	}

	public async update(id: number, payload: IClientUpdatePayload) {
		const client = await this.clientRepository.findOne({ where: { id } })

		if (!client) throw new NotFoundException('client not found')

		const dataEntity = omitBy(omit(payload, ['translations']), isNil)

		if (!isEmpty(payload.translations)) {
			await this.putTranslations(client.id, payload.translations)
		}

		if (!isEmpty(dataEntity)) {
			await this.clientRepository.update(id, dataEntity)
		}
	}

	private async putTranslations(
		clientId: number,
		translations: IClientTranslatePayload[],
		clearPrevios = true,
	) {
		if (clearPrevios) await this.clientTranslateRepository.delete({ clientId })
		const toSave = translations.map(it => ({
			lang: it.lang,
			name: it.name,
			clientId,
			description: it.description,
		}))

		await this.clientTranslateRepository.insert(toSave)
		return toSave
	}
}

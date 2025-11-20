import { Inject, Injectable } from '@nestjs/common'
import { CONTACTS_SERVICE, IContactsService } from 'src/domain/contacts/typing/consts'

@Injectable()
export class PublicContactsService {
  constructor(
    @Inject(CONTACTS_SERVICE)
    private readonly contactsService: IContactsService,
  ) {}

  async getTabs() {
    return this.contactsService.getTabs()
  }
}
import { Controller, Get } from '@nestjs/common'
import { PublicContactsService } from './contacts.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('PUBLIC | CONTACTS')
@Controller('contacts')
export class PublicContactsController {
  constructor(private readonly contactsService: PublicContactsService) {}

  @Get()
  getTabs() {
    return this.contactsService.getTabs()
  }
}
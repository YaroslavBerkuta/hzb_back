import { DynamicModule, Module } from '@nestjs/common'
import { ContactsModule } from 'src/domain/contacts/contacts.module'
import { PublicContactsController } from './contacts.controller'
import { PublicContactsService } from './contacts.service'

@Module({})
export class PublicContactsModule {
  static forRoot(): DynamicModule {
    return {
      module: PublicContactsModule,
      controllers: [PublicContactsController],
      providers: [PublicContactsService],
      imports: [ContactsModule.forFeature()],
    }
  }
}
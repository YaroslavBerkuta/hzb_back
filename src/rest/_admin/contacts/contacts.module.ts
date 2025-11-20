import { DynamicModule, Module } from '@nestjs/common'
import { ContactsModule } from 'src/domain/contacts/contacts.module'
import { AdminContactsController } from './contacts.controller'
import { AdminContactsService } from './contacts.service'

@Module({})
export class AdminContactsModule {
  static forRoot(): DynamicModule {
    return {
      module: AdminContactsModule,
      controllers: [AdminContactsController],
      providers: [AdminContactsService],
      imports: [ContactsModule.forFeature()],
    }
  }
}
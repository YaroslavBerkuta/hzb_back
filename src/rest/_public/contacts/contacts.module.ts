import { DynamicModule, Module } from '@nestjs/common'
import { ContactsModule } from 'src/domain/contacts/contacts.module'
import { PublicContactsController } from './contacts.controller'
import { PublicContactsService } from './contacts.service'
import {
  CONTACTS_TAB_REPOSITORY,
  CONTACTS_DEPARTMENT_REPOSITORY,
  CONTACTS_SUBDEPARTMENT_REPOSITORY,
  CONTACTS_TAB_TRANSLATION_REPOSITORY,
  CONTACTS_DEPARTMENT_TRANSLATION_REPOSITORY,
  CONTACTS_SUBDEPARTMENT_TRANSLATION_REPOSITORY,
} from 'src/domain/contacts/typing/consts'
import {
  ContactsTab,
  ContactsDepartment,
  ContactsSubdepartment,
  ContactsTabTranslation,
  ContactsDepartmentTranslation,
  ContactsSubdepartmentTranslation,
} from 'src/domain/contacts/entities'
import { provideEntity } from 'src/libs/database'

@Module({})
export class PublicContactsModule {
  static getProviders() {
    return [
      provideEntity(CONTACTS_TAB_REPOSITORY, ContactsTab),
      provideEntity(CONTACTS_DEPARTMENT_REPOSITORY, ContactsDepartment),
      provideEntity(CONTACTS_SUBDEPARTMENT_REPOSITORY, ContactsSubdepartment),
      provideEntity(CONTACTS_TAB_TRANSLATION_REPOSITORY, ContactsTabTranslation),
      provideEntity(CONTACTS_DEPARTMENT_TRANSLATION_REPOSITORY, ContactsDepartmentTranslation),
      provideEntity(CONTACTS_SUBDEPARTMENT_TRANSLATION_REPOSITORY, ContactsSubdepartmentTranslation),
    ]
  }

  static forRoot(): DynamicModule {
    return {
      module: PublicContactsModule,
      controllers: [PublicContactsController],
      providers: [PublicContactsService, ...this.getProviders()],
      imports: [ContactsModule.forFeature()],
    }
  }
}
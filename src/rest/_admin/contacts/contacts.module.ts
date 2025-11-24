import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs/database'
import { ContactsModule } from 'src/domain/contacts/contacts.module'
import { AdminContactsController } from './contacts.controller'
import { AdminContactsService } from './contacts.service'
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

@Module({})
export class AdminContactsModule {
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
      module: AdminContactsModule,
      controllers: [AdminContactsController],
      providers: [AdminContactsService, ...this.getProviders()],
      imports: [ContactsModule.forFeature()],
    }
  }
}
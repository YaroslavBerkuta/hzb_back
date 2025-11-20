import { DynamicModule, Module } from '@nestjs/common'
import { provideEntity } from 'src/libs/database'
import {
  CONTACTS_TAB_REPOSITORY,
  CONTACTS_DEPARTMENT_REPOSITORY,
  CONTACTS_SUBDEPARTMENT_REPOSITORY,
  CONTACTS_TAB_TRANSLATION_REPOSITORY,
  CONTACTS_DEPARTMENT_TRANSLATION_REPOSITORY,
  CONTACTS_SUBDEPARTMENT_TRANSLATION_REPOSITORY,
  CONTACTS_SERVICE,
} from './typing/consts'
import {
  ContactsTab,
  ContactsDepartment,
  ContactsSubdepartment,
  ContactsTabTranslation,
  ContactsDepartmentTranslation,
  ContactsSubdepartmentTranslation,
} from './entities'
import { provideClass } from 'src/shared'
import { ContactsService } from './services/contacts.service'

@Module({})
export class ContactsModule {
  static getProviders() {
    return [
      provideEntity(CONTACTS_TAB_REPOSITORY, ContactsTab),
      provideEntity(CONTACTS_DEPARTMENT_REPOSITORY, ContactsDepartment),
      provideEntity(CONTACTS_SUBDEPARTMENT_REPOSITORY, ContactsSubdepartment),
      provideEntity(CONTACTS_TAB_TRANSLATION_REPOSITORY, ContactsTabTranslation),
      provideEntity(CONTACTS_DEPARTMENT_TRANSLATION_REPOSITORY, ContactsDepartmentTranslation),
      provideEntity(CONTACTS_SUBDEPARTMENT_TRANSLATION_REPOSITORY, ContactsSubdepartmentTranslation),
      provideClass(CONTACTS_SERVICE, ContactsService),
    ]
  }

  static imports() {
    return []
  }

  static forRoot(): DynamicModule {
    return {
      module: ContactsModule,
      imports: this.imports(),
      providers: this.getProviders(),
    }
  }

  static forFeature(): DynamicModule {
    return {
      module: ContactsModule,
      imports: this.imports(),
      providers: this.getProviders(),
      exports: [CONTACTS_SERVICE],
    }
  }
}
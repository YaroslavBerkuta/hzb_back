export * from '../interfaces'

import { Repository } from 'typeorm'
import { ContactsTab, ContactsDepartment, ContactsSubdepartment, ContactsTabTranslation, ContactsDepartmentTranslation, ContactsSubdepartmentTranslation } from '../../entities'

export const CONTACTS_TAB_REPOSITORY = Symbol('CONTACTS_TAB_REPOSITORY')
export const CONTACTS_DEPARTMENT_REPOSITORY = Symbol('CONTACTS_DEPARTMENT_REPOSITORY')
export const CONTACTS_SUBDEPARTMENT_REPOSITORY = Symbol('CONTACTS_SUBDEPARTMENT_REPOSITORY')
export const CONTACTS_TAB_TRANSLATION_REPOSITORY = Symbol('CONTACTS_TAB_TRANSLATION_REPOSITORY')
export const CONTACTS_DEPARTMENT_TRANSLATION_REPOSITORY = Symbol('CONTACTS_DEPARTMENT_TRANSLATION_REPOSITORY')
export const CONTACTS_SUBDEPARTMENT_TRANSLATION_REPOSITORY = Symbol('CONTACTS_SUBDEPARTMENT_TRANSLATION_REPOSITORY')
export const CONTACTS_SERVICE = Symbol('CONTACTS_SERVICE')

export type TContactsTabRepository = Repository<ContactsTab>
export type TContactsDepartmentRepository = Repository<ContactsDepartment>
export type TContactsSubdepartmentRepository = Repository<ContactsSubdepartment>
export type TContactsTabTranslationRepository = Repository<ContactsTabTranslation>
export type TContactsDepartmentTranslationRepository = Repository<ContactsDepartmentTranslation>
export type TContactsSubdepartmentTranslationRepository = Repository<ContactsSubdepartmentTranslation>
import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import {
  ContactsTab,
  ContactsDepartment,
  ContactsSubdepartment,
  ContactsTabTranslation,
  ContactsDepartmentTranslation,
  ContactsSubdepartmentTranslation,
} from '../entities'
import {
  IContactsService,
  ICreateContactsTabPayload,
  ICreateContactsDepartmentPayload,
  ICreateContactsSubdepartmentPayload,
  CONTACTS_TAB_REPOSITORY,
  CONTACTS_DEPARTMENT_REPOSITORY,
  CONTACTS_SUBDEPARTMENT_REPOSITORY,
  CONTACTS_TAB_TRANSLATION_REPOSITORY,
  CONTACTS_DEPARTMENT_TRANSLATION_REPOSITORY,
  CONTACTS_SUBDEPARTMENT_TRANSLATION_REPOSITORY,
} from '../typing/consts'

@Injectable()
export class ContactsService implements IContactsService {
  constructor(
    @Inject(CONTACTS_TAB_REPOSITORY)
    private readonly tabRepository: Repository<ContactsTab>,
    @Inject(CONTACTS_DEPARTMENT_REPOSITORY)
    private readonly departmentRepository: Repository<ContactsDepartment>,
    @Inject(CONTACTS_SUBDEPARTMENT_REPOSITORY)
    private readonly subdepartmentRepository: Repository<ContactsSubdepartment>,
    @Inject(CONTACTS_TAB_TRANSLATION_REPOSITORY)
    private readonly tabTranslationRepository: Repository<ContactsTabTranslation>,
    @Inject(CONTACTS_DEPARTMENT_TRANSLATION_REPOSITORY)
    private readonly departmentTranslationRepository: Repository<ContactsDepartmentTranslation>,
    @Inject(CONTACTS_SUBDEPARTMENT_TRANSLATION_REPOSITORY)
    private readonly subdepartmentTranslationRepository: Repository<ContactsSubdepartmentTranslation>,
  ) {}

  // Tabs
  public async createTab(payload: ICreateContactsTabPayload) {
    try {
      const tab = await this.tabRepository.save({ position: payload.position || 0 })
      await this.putTabTranslations(tab.id, payload.translations, false)
    } catch (error) {
      console.log('error:', error)
      throw new Error(error)
    }
  }

  public async getTabs() {
    try {
      const query = await this.tabRepository
        .createQueryBuilder('tab')
        .leftJoinAndSelect('tab.translations', 'translations')
        .leftJoinAndSelect('tab.departments', 'departments')
        .leftJoinAndSelect('departments.translations', 'departmentTranslations')
        .leftJoinAndSelect('departments.subdepartments', 'subdepartments')
        .leftJoinAndSelect('subdepartments.translations', 'subdepartmentTranslations')
        .orderBy('tab.position', 'ASC')
        .addOrderBy('departments.position', 'ASC')
        .addOrderBy('subdepartments.position', 'ASC')
        .getMany()
      return query
    } catch (error) {
      console.log('error:', error)
      throw new Error(error)
    }
  }

  public async updateTab(id: number, payload: ICreateContactsTabPayload) {
    try {
      await this.tabRepository.update(id, { position: payload.position })
      await this.putTabTranslations(id, payload.translations, true)
    } catch (error) {
      console.log('error:', error)
      throw new Error(error)
    }
  }

  public async deleteTab(id: number) {
    try {
      await this.tabRepository.delete(id)
    } catch (error) {
      console.log('error:', error)
      throw new Error(error)
    }
  }

  private async putTabTranslations(
    tabId: number,
    translates: ICreateContactsTabPayload['translations'],
    clearPrevious = true,
  ) {
    try {
      if (clearPrevious) await this.tabTranslationRepository.delete({ tabId })
      const toSave = translates.map(it => ({
        lang: it.lang,
        name: it.name,
        tabId,
      }))

      await this.tabTranslationRepository.insert(toSave)
      return toSave
    } catch (error) {
      console.log('error:', error)
      throw new Error(error)
    }
  }

  // Departments
  public async createDepartment(payload: ICreateContactsDepartmentPayload) {
    try {
      const department = await this.departmentRepository.save({
        position: payload.position || 0,
        tab: { id: payload.tabId },
      })
      await this.putDepartmentTranslations(department.id, payload.translations, false)
    } catch (error) {
      console.log('error:', error)
      throw new Error(error)
    }
  }

  public async getDepartmentsByTabId(tabId: number) {
    try {
      const query = await this.departmentRepository
        .createQueryBuilder('dept')
        .leftJoinAndSelect('dept.translations', 'translations')
        .leftJoinAndSelect('dept.subdepartments', 'subdepartments')
        .leftJoinAndSelect('subdepartments.translations', 'subdepartmentTranslations')
        .where('dept.tabId = :tabId', { tabId })
        .orderBy('dept.position', 'ASC')
        .addOrderBy('subdepartments.position', 'ASC')
        .getMany()
      return query
    } catch (error) {
      console.log('error:', error)
      throw new Error(error)
    }
  }

  public async updateDepartment(id: number, payload: ICreateContactsDepartmentPayload) {
    try {
      await this.departmentRepository.update(id, { position: payload.position, tab: { id: payload.tabId } })
      await this.putDepartmentTranslations(id, payload.translations, true)
    } catch (error) {
      console.log('error:', error)
      throw new Error(error)
    }
  }

  public async deleteDepartment(id: number) {
    try {
      await this.departmentRepository.delete(id)
    } catch (error) {
      console.log('error:', error)
      throw new Error(error)
    }
  }

  private async putDepartmentTranslations(
    departmentId: number,
    translates: ICreateContactsDepartmentPayload['translations'],
    clearPrevious = true,
  ) {
    try {
      if (clearPrevious) await this.departmentTranslationRepository.delete({ departmentId })
      const toSave = translates.map(it => ({
        lang: it.lang,
        name: it.name,
        emails: it.emails,
        phones: it.phones,
        departmentId,
      }))

      await this.departmentTranslationRepository.insert(toSave)
      return toSave
    } catch (error) {
      console.log('error:', error)
      throw new Error(error)
    }
  }

  // Subdepartments
  public async createSubdepartment(payload: ICreateContactsSubdepartmentPayload) {
    try {
      const subdepartment = await this.subdepartmentRepository.save({
        position: payload.position || 0,
        department: { id: payload.departmentId },
      })
      await this.putSubdepartmentTranslations(subdepartment.id, payload.translations, false)
    } catch (error) {
      console.log('error:', error)
      throw new Error(error)
    }
  }

  public async getSubdepartmentsByDepartmentId(departmentId: number) {
    try {
      const query = await this.subdepartmentRepository
        .createQueryBuilder('subdept')
        .leftJoinAndSelect('subdept.translations', 'translations')
        .where('subdept.departmentId = :departmentId', { departmentId })
        .orderBy('subdept.position', 'ASC')
        .getMany()
      return query
    } catch (error) {
      console.log('error:', error)
      throw new Error(error)
    }
  }

  public async updateSubdepartment(id: number, payload: ICreateContactsSubdepartmentPayload) {
    try {
      await this.subdepartmentRepository.update(id, { position: payload.position, department: { id: payload.departmentId } })
      await this.putSubdepartmentTranslations(id, payload.translations, true)
    } catch (error) {
      console.log('error:', error)
      throw new Error(error)
    }
  }

  public async deleteSubdepartment(id: number) {
    try {
      await this.subdepartmentRepository.delete(id)
    } catch (error) {
      console.log('error:', error)
      throw new Error(error)
    }
  }

  private async putSubdepartmentTranslations(
    subdepartmentId: number,
    translates: ICreateContactsSubdepartmentPayload['translations'],
    clearPrevious = true,
  ) {
    try {
      if (clearPrevious) await this.subdepartmentTranslationRepository.delete({ subdepartmentId })
      const toSave = translates.map(it => ({
        lang: it.lang,
        name: it.name,
        emails: it.emails,
        phones: it.phones,
        subdepartmentId,
      }))

      await this.subdepartmentTranslationRepository.insert(toSave)
      return toSave
    } catch (error) {
      console.log('error:', error)
      throw new Error(error)
    }
  }
}
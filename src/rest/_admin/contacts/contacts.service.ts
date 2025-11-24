import { Inject, Injectable } from '@nestjs/common'
import { CONTACTS_SERVICE, CONTACTS_TAB_REPOSITORY, IContactsService, TContactsTabRepository } from 'src/domain/contacts/typing/consts'
import { IPagination, paginateAndGetMany } from 'src/shared'

@Injectable()
export class AdminContactsService {
  constructor(
    @Inject(CONTACTS_SERVICE)
    private readonly contactsService: IContactsService,
    @Inject(CONTACTS_TAB_REPOSITORY) private readonly contactsTabRepository: TContactsTabRepository
  ) {}

  // Tabs
  async createTab(payload: any) {
    return this.contactsService.createTab(payload)
  }

  async getTabs(pagination: IPagination) {
    const query = this.contactsTabRepository
      .createQueryBuilder('it')
      .leftJoinAndSelect('it.translations', 'translations')
      .orderBy('it.createdAt', 'DESC')

    const { items, count } = await paginateAndGetMany(query, pagination, 'it')

    await Promise.all(
      items.map(async (it, index, arr: any) => {
        arr[index].translations = it.translations
      }),
    )
    return {
      items,
      count,
    }
  }

  async updateTab(id: number, payload: any) {
    return this.contactsService.updateTab(id, payload)
  }

  async deleteTab(id: number) {
    return this.contactsService.deleteTab(id)
  }

  // Departments
  async createDepartment(payload: any) {
    return this.contactsService.createDepartment(payload)
  }

  async getDepartmentsByTabId(tabId: number) {
    return this.contactsService.getDepartmentsByTabId(tabId)
  }

  async updateDepartment(id: number, payload: any) {
    return this.contactsService.updateDepartment(id, payload)
  }

  async deleteDepartment(id: number) {
    return this.contactsService.deleteDepartment(id)
  }

  // Subdepartments
  async createSubdepartment(payload: any) {
    return this.contactsService.createSubdepartment(payload)
  }

  async getSubdepartmentsByDepartmentId(departmentId: number) {
    return this.contactsService.getSubdepartmentsByDepartmentId(departmentId)
  }

  async updateSubdepartment(id: number, payload: any) {
    return this.contactsService.updateSubdepartment(id, payload)
  }

  async deleteSubdepartment(id: number) {
    return this.contactsService.deleteSubdepartment(id)
  }
}
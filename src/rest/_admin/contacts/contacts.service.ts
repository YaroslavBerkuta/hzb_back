import { Inject, Injectable } from '@nestjs/common'
import { CONTACTS_SERVICE, IContactsService } from 'src/domain/contacts/typing/consts'

@Injectable()
export class AdminContactsService {
  constructor(
    @Inject(CONTACTS_SERVICE)
    private readonly contactsService: IContactsService,
  ) {}

  // Tabs
  async createTab(payload: any) {
    return this.contactsService.createTab(payload)
  }

  async getTabs() {
    return this.contactsService.getTabs()
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
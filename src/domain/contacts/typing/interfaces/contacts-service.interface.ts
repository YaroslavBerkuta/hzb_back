import { Lang } from '../../../../shared/enums/lang.enum'
import { ContactsDepartment, ContactsSubdepartment, ContactsTab } from '../../entities'
import { IContactsTab, IContactsDepartment, IContactsSubdepartment } from './contacts.interface'

export interface IContactsService {
  createTab(payload: ICreateContactsTabPayload): Promise<ContactsTab>
  getTabs(): Promise<IContactsTab[]>
  updateTab(id: number, payload: ICreateContactsTabPayload): Promise<ContactsTab | null>
  deleteTab(id: number): Promise<void>

  createDepartment(payload: ICreateContactsDepartmentPayload): Promise<ContactsDepartment>
  getDepartmentsByTabId(tabId: number): Promise<IContactsDepartment[]>
  updateDepartment(id: number, payload: ICreateContactsDepartmentPayload): Promise<ContactsDepartment | null>
  deleteDepartment(id: number): Promise<void>
  
  createSubdepartment(payload: ICreateContactsSubdepartmentPayload): Promise<ContactsSubdepartment>
  getSubdepartmentsByDepartmentId(departmentId: number): Promise<IContactsSubdepartment[]>
  updateSubdepartment(id: number, payload: ICreateContactsSubdepartmentPayload): Promise<ContactsSubdepartment | null>
  deleteSubdepartment(id: number): Promise<void>
}

export interface ICreateContactsTabPayload {
  position?: number
  translations: ICreateContactsTabTranslatesPayload[]
}
export interface ICreateContactsTabTranslatesPayload {
  lang: Lang
  name: string
}

export interface ICreateContactsDepartmentPayload {
  position?: number
  tabId: number
  translations: ICreateContactsDepartmentTranslatesPayload[]
}
export interface ICreateContactsDepartmentTranslatesPayload {
  lang: Lang
  name: string
  emails?: string[]
  phones?: string[]
}

export interface ICreateContactsSubdepartmentPayload {
  position?: number
  departmentId: number
  translations: ICreateContactsSubdepartmentTranslatesPayload[]
}
export interface ICreateContactsSubdepartmentTranslatesPayload {
  lang: Lang
  name: string
  emails?: string[]
  phones?: string[]
}
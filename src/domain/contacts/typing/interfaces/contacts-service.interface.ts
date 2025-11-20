import { Lang } from '../../../../shared/enums/lang.enum'
import { IContactsTab, IContactsDepartment, IContactsSubdepartment } from './contacts.interface'

export interface IContactsService {
  createTab(payload: ICreateContactsTabPayload): Promise<void>
  createDepartment(payload: ICreateContactsDepartmentPayload): Promise<void>
  createSubdepartment(payload: ICreateContactsSubdepartmentPayload): Promise<void>
  getTabs(): Promise<IContactsTab[]>
  getDepartmentsByTabId(tabId: number): Promise<IContactsDepartment[]>
  getSubdepartmentsByDepartmentId(departmentId: number): Promise<IContactsSubdepartment[]>
  updateTab(id: number, payload: ICreateContactsTabPayload): Promise<void>
  updateDepartment(id: number, payload: ICreateContactsDepartmentPayload): Promise<void>
  deleteDepartment(id: number): Promise<void>
  deleteTab(id: number): Promise<void>
  updateSubdepartment(id: number, payload: ICreateContactsSubdepartmentPayload): Promise<void>
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
  subdepartmentIds?: number[]
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
import { Lang } from './../../../../shared/enums/lang.enum'

export interface IContactsTab {
  id: number
  position: number

  translations?: IContactsTabTranslation[]
  departments?: IContactsDepartment[]

  createdAt?: string
  updatedAt?: string
}
export interface IContactsTabTranslation {
  id: number
  lang: Lang
  name: string

  createdAt?: string
  updatedAt?: string
}

export interface IContactsDepartment {
  id: number
  position: number

  translations?: IContactsDepartmentTranslation[]
  subdepartments?: IContactsSubdepartment[]

  createdAt?: string
  updatedAt?: string
}
export interface IContactsDepartmentTranslation {
  id: number
  lang: Lang
  name: string
  emails?: string[]
  phones?: string[]

  createdAt?: string
  updatedAt?: string
}

export interface IContactsSubdepartment {
  id: number
  position: number

  translations?: IContactsSubdepartmentTranslation[]
  
  createdAt?: string
  updatedAt?: string
}
export interface IContactsSubdepartmentTranslation {
  id: number
  lang: Lang
  name: string
  emails?: string[]
  phones?: string[]

  createdAt?: string
  updatedAt?: string
}
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from 'src/shared'
import { IContactsDepartment, IContactsSubdepartment, IContactsSubdepartmentTranslation, IContactsTab } from "../typing/interfaces";
import { ContactsDepartmentTranslation, ContactsSubdepartmentTranslation, ContactsTabTranslation } from "./contacts-translation.entity";


@Entity('contacts-tab')
export class ContactsTab extends BaseEntity implements IContactsTab {
  @Column()
  position: number

  @OneToMany(() => ContactsTabTranslation, ctt => ctt.tabId)
  translations?: ContactsTabTranslation[]

  @OneToMany(() => ContactsDepartment, dept => dept.tabId)
  departments?: IContactsDepartment[]
}

@Entity('contacts-department')
export class ContactsDepartment extends BaseEntity implements IContactsDepartment {
  @Column()
  position: number

  @ManyToOne(() => ContactsTab, tab => tab.departments, { onDelete: 'CASCADE' })
  tabId: ContactsTab

  @ManyToOne(() => ContactsTab, tab => tab.departments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tabId' })
  tab: ContactsTab

  @OneToMany(() => ContactsDepartmentTranslation, cdt => cdt.departmentId)
  translations?: ContactsDepartmentTranslation[]

  @OneToMany(() => ContactsSubdepartment, sd => sd.departmentId)
  subdepartments?: IContactsSubdepartment[]
}

@Entity('contacts-subdepartment')
export class ContactsSubdepartment extends BaseEntity implements IContactsSubdepartment {
  @Column()
  position: number

  @ManyToOne(() => ContactsDepartment, dept => dept.subdepartments, { onDelete: 'CASCADE' })
  departmentId: ContactsDepartment

  @ManyToOne(() => ContactsDepartment, dept => dept.subdepartments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'departmentId' })
  department: ContactsDepartment

  @OneToMany(() => ContactsSubdepartmentTranslation, cst => cst.subdepartmentId)
  translations?: IContactsSubdepartmentTranslation[]
}
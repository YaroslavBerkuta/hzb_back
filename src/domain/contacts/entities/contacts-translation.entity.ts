import { BaseEntity } from 'src/shared'
import { Lang } from 'src/shared/enums'
import { IContactsDepartmentTranslation, IContactsSubdepartmentTranslation, IContactsTabTranslation } from '../typing/interfaces'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { ContactsDepartment, ContactsSubdepartment, ContactsTab } from './contacts.entity'

@Entity('contactsTabTranslation')
export class ContactsTabTranslation extends BaseEntity implements IContactsTabTranslation {
  @Column({ type: 'varchar', enum: Lang, default: Lang.ua })
  lang: Lang
  
  @Column()
  name: string

  @Column()
  tabId: number

  @ManyToOne(() => ContactsTab, tab => tab.translations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tabId' })
  tab: ContactsTab
}

@Entity('contactsDepartmentTranslation')
export class ContactsDepartmentTranslation extends BaseEntity implements IContactsDepartmentTranslation {
  @Column({ type: 'varchar', enum: Lang, default: Lang.ua })
  lang: Lang

  @Column()
  name: string

  @Column()
  emails?: string[]

  @Column()
  phones?: string[]

  @Column()
  departmentId: number

  @ManyToOne(() => ContactsDepartment, dept => dept.translations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'departmentId' })
  department: ContactsDepartment
}

@Entity('contactsSubdepartmentTranslation')
export class ContactsSubdepartmentTranslation extends BaseEntity implements IContactsSubdepartmentTranslation {
  @Column({ type: 'varchar', enum: Lang, default: Lang.ua })
  lang: Lang

  @Column()
  name: string

  @Column()
  emails?: string[]

  @Column()
  phones?: string[]

  @Column()
  subdepartmentId: number

  @ManyToOne(() => ContactsSubdepartment, subdept => subdept.translations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subdepartmentId' })
  subdepartment: ContactsSubdepartment
}
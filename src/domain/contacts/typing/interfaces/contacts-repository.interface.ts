import { Repository } from "typeorm";
import { 
  IContactsTab,
  IContactsTabTranslation, 
  IContactsDepartment, 
  IContactsDepartmentTranslation,
  IContactsSubdepartment,
  IContactsSubdepartmentTranslation
} from "./contacts.interface";

export type TContactsTabRepository = Repository<IContactsTab>;
export type TContactsTabTranslationRepository = Repository<IContactsTabTranslation>;

export type TContactsDepartmentRepository = Repository<IContactsDepartment>;
export type TContactsDepartmentTranslationRepository = Repository<IContactsDepartmentTranslation>;

export type TContactsSubdepartmentRepository = Repository<IContactsSubdepartment>;
export type TContactsSubdepartmentTranslationRepository = Repository<IContactsSubdepartmentTranslation>;
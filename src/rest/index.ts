import {
	PublicAwardsModule,
	PublicFormModule,
	PublicNewsModule,
	PublicProductionsModule,
	PublicProjectsModule,
	PublicQualityModule,
} from './_public'
import { FilesStoreModule } from './files-store/files-store.module'

export const REST_MODULES = () => [
	FilesStoreModule.forRoot(),
	PublicNewsModule.forRoot(),
	PublicFormModule.forRoot(),
	PublicAwardsModule.forRoot(),
	PublicProjectsModule.forRoot(),
	PublicProductionsModule.forRoot(),
	PublicQualityModule.forRoot(),
]

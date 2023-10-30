import {
	AdminAccountModule,
	AdminAuthModule,
	AdminAwardsModule,
	AdminDistributorsModule,
	AdminNewsModule,
} from './_admin'
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

	AdminAuthModule.forRoot(),
	AdminAccountModule.forRoot(),
	AdminNewsModule.forRoot(),
	AdminAwardsModule.forRoot(),
	AdminDistributorsModule.forRoot(),
]

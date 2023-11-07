import {
	AdminAccountModule,
	AdminAuthModule,
	AdminAwardsModule,
	AdminDistributorsModule,
	AdminLabolatoryModule,
	AdminNewsModule,
	AdminProjectsModule,
	AdminQualityModule,
} from './_admin'
import {
	PublicAwardsModule,
	PublicDistributorsModule,
	PublicFormModule,
	PublicNewsModule,
	PublicProductionsModule,
	PublicProjectsModule,
	PublicQualityModule,
} from './_public'
import { FilesStoreModule } from './files-store/files-store.module'
import { AdminProductionsModule } from './_admin/productions/productions.module'

export const REST_MODULES = () => [
	FilesStoreModule.forRoot(),
	PublicNewsModule.forRoot(),
	PublicFormModule.forRoot(),
	PublicAwardsModule.forRoot(),
	PublicProjectsModule.forRoot(),
	PublicProductionsModule.forRoot(),
	PublicQualityModule.forRoot(),
	PublicDistributorsModule.forRoot(),

	AdminAuthModule.forRoot(),
	AdminAccountModule.forRoot(),
	AdminNewsModule.forRoot(),
	AdminAwardsModule.forRoot(),
	AdminDistributorsModule.forRoot(),
	AdminProductionsModule.forRoot(),
	AdminProjectsModule.forRoot(),
	AdminQualityModule.forRoot(),
	AdminLabolatoryModule.forRoot(),
]

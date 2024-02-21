import {
	AdminAccountModule,
	AdminAuthModule,
	AdminAwardsModule,
	AdminCategoryModule,
	AdminDistributorsModule,
	AdminLabolatoryModule,
	AdminNewsModule,
	AdminPartnerModule,
	AdminProjectsModule,
	AdminQualityModule,
} from './_admin'
import {
	PublicAwardsModule,
	PublicCategoriesModule,
	PublicDistributorsModule,
	PublicFormModule,
	PublicLabolatoryModule,
	PublicNewsModule,
	PublicPartnerModule,
	PublicProductionsModule,
	PublicProductsModule,
	PublicProjectsModule,
	PublicQualityModule,
} from './_public'
import { FilesStoreModule } from './files-store/files-store.module'
import { AdminProductionsModule } from './_admin/productions/productions.module'
import { AdminProductsModule } from './_admin/products/products.module'

export const REST_MODULES = () => [
	FilesStoreModule.forRoot(),
	PublicNewsModule.forRoot(),
	PublicFormModule.forRoot(),
	PublicAwardsModule.forRoot(),
	PublicProjectsModule.forRoot(),
	PublicProductionsModule.forRoot(),
	PublicQualityModule.forRoot(),
	PublicDistributorsModule.forRoot(),
	PublicLabolatoryModule.forRoot(),
	PublicPartnerModule.forRoot(),
	PublicCategoriesModule.forRoot(),
	PublicProductsModule.forRoot(),

	AdminAuthModule.forRoot(),
	AdminAccountModule.forRoot(),
	AdminNewsModule.forRoot(),
	AdminAwardsModule.forRoot(),
	AdminDistributorsModule.forRoot(),
	AdminProductionsModule.forRoot(),
	AdminProjectsModule.forRoot(),
	AdminQualityModule.forRoot(),
	AdminLabolatoryModule.forRoot(),
	AdminPartnerModule.forRoot(),
	AdminProductsModule.forRoot(),
	AdminCategoryModule.forRoot(),
]

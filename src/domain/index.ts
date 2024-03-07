import { getEnv } from 'src/shared'
import { ClientsModule } from './clients/clients.module'
import { SessionsModule } from './sessions/sessions.module'
import { UsersModule } from './users/users.module'
import { NewsModule } from './news/news.module'
import { GalleryModule } from './galleries/gallery.module'
import { DistributorsModule } from './distributors/distributors.module'
import { ProjectsModule } from './projects/projects.module'
import { ProductionsModule } from './productions/productions.module'
import { AwardsModule } from './awards/awards.module'
import { QualityModule } from './quality/quality.module'
import { LabolatoryModule } from './labolatory/labolatory.module'
import { PartnerModule } from './partner/partner.module'
import { CategoriesModule } from './categories/categories.module'
import { ProductsModule } from './products/products.module'
import { InstagramModule } from './instagram/instagram.module'

export const DOMAIN_MODULES = () => [
	SessionsModule.forRoot(),
	UsersModule.forRoot({ passwordHashSalt: getEnv('LOCAL_HASH_SALT') }),
	ClientsModule.forRoot(),
	NewsModule.forRoot(),
	GalleryModule.forRoot(),
	DistributorsModule.forRoot(),
	ProjectsModule.forRoot(),
	NewsModule.forRoot(),
	ProductionsModule.forRoot(),
	AwardsModule.forRoot(),
	QualityModule.forRoot(),
	LabolatoryModule.forRoot(),
	PartnerModule.forRoot(),
	CategoriesModule.forRoot(),
	ProductsModule.forRoot(),
	InstagramModule.forRoot(),
]

import { DynamicModule, Module } from '@nestjs/common'
import { GalleryModule } from 'src/domain/galleries/gallery.module'
import { PartnerModule } from 'src/domain/partner/partner.module'
import { PublicPartnerService } from './partners.service'
import { PublicPartnersController } from './partners.controller'

@Module({})
export class PublicPartnerModule {
	static forRoot(): DynamicModule {
		return {
			module: PublicPartnerModule,
			controllers: [PublicPartnersController],
			providers: [PublicPartnerService],
			imports: [PartnerModule.forFeature(), GalleryModule.forFeature()],
		}
	}
}

import { DynamicModule, Module } from '@nestjs/common'
import { GalleryModule } from 'src/domain/galleries/gallery.module'
import { PartnerModule } from 'src/domain/partner/partner.module'
import { AdminPartnerService } from './partner.service'
import { AdminPartnerController } from './partner.controller'

@Module({})
export class AdminPartnerModule {
	static forRoot(): DynamicModule {
		return {
			module: AdminPartnerModule,
			controllers: [AdminPartnerController],
			providers: [AdminPartnerService],
			imports: [PartnerModule.forFeature(), GalleryModule.forFeature()],
		}
	}
}

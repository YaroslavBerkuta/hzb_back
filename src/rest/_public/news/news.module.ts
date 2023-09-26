import { Module, DynamicModule } from '@nestjs/common'
import { NewsModule } from 'src/domain/news/news.module'
import { PublicNewsService } from './news.service'
import { PublicNewsController } from './news.controller'
import { GalleryModule } from 'src/domain/galleries/gallery.module'

@Module({})
export class PublicNewsModule {
	static forRoot(): DynamicModule {
		return {
			module: PublicNewsModule,
			controllers: [PublicNewsController],
			providers: [PublicNewsService],
			imports: [NewsModule.forFeature(), GalleryModule.forFeature()],
		}
	}
}

import { Module, DynamicModule } from '@nestjs/common'
import { NewsModule } from 'src/domain/news/news.module'
import { PublickNewsService } from './news.service'
import { PublickNewsController } from './news.controller'
import { GalleryModule } from 'src/domain/galleries/gallery.module'

@Module({})
export class PublickNewsModule {
	static forRoot(): DynamicModule {
		return {
			module: PublickNewsModule,
			controllers: [PublickNewsController],
			providers: [PublickNewsService],
			imports: [NewsModule.forFeature(), GalleryModule.forFeature()],
		}
	}
}

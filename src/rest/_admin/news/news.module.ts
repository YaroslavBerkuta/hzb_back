import { DynamicModule, Module } from '@nestjs/common'
import { GalleryModule } from 'src/domain/galleries/gallery.module'
import { NewsModule } from 'src/domain/news/news.module'
import { AdminNewsController } from './news.controller'
import { AdminNewsService } from './news.service'

@Module({})
export class AdminNewsModule {
	static forRoot(): DynamicModule {
		return {
			module: AdminNewsModule,
			controllers: [AdminNewsController],
			providers: [AdminNewsService],
			imports: [NewsModule.forFeature(), GalleryModule.forFeature()],
		}
	}
}

import { DynamicModule, Module } from '@nestjs/common'
import { GalleryModule } from 'src/domain/galleries/gallery.module'
import { FilesStorageModule } from 'src/libs/files-storage'
import { JwtModule } from 'src/libs/jwt'
import { RedisModule } from 'src/libs/redis'
import { FilesStoreController } from './files-store.controller'
import { FilesStoreService } from './files-store.service'
import { FilesStoreAccessService } from './files-store-access.service'

@Module({})
export class FilesStoreModule {
	static forRoot(): DynamicModule {
		return {
			module: FilesStoreModule,
			controllers: [FilesStoreController],
			providers: [FilesStoreService, FilesStoreAccessService],
			imports: [
				FilesStorageModule.forFeature(),
				RedisModule.forFeature(),
				GalleryModule.forFeature(),
				JwtModule.forFeature(),
			],
		}
	}
}

import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { PlaylistController } from './playlist.controller';
import { PlaylistItemController } from './PlaylistItem.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, Videochema } from 'src/schemas/videos.schema';


@Module({

  imports: [MongooseModule.forFeature([{ name: Video.name, schema: Videochema }])],
  controllers: [VideosController, PlaylistController, PlaylistItemController],
  providers: [VideosService]
})
export class VideosModule {}

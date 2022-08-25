import { Module } from '@nestjs/common';

import { VideosModule } from './videos/videos.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  
imports: [VideosModule, MongooseModule.forRoot('mongodb+srv://Gayasha:sNk7hfOeEY44TFJC@atlascluster.vaw8xm9.mongodb.net/?retryWrites=true&w=majority')],

})
export class AppModule {}

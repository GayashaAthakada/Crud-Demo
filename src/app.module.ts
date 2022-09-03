import { Module } from '@nestjs/common';

import { VideosModule } from './videos/videos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  
imports: [VideosModule, MongooseModule.forRoot('mongodb+srv://Gayasha:KZ0ORLTEcD8fb1L0@atlascluster.vaw8xm9.mongodb.net/?retryWrites=true&w=majority'), UsersModule, AuthModule],
  
controllers: [AppController],
  
providers: [AppService],

})
export class AppModule {}

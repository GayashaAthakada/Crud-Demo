import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema()
export class Video {
  @Prop()
  username: string;

  @Prop()
  Password: string;

  
}

export const VideoSchema = SchemaFactory.createForClass(Video);
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from 'src/schemas/videos.schema';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideosService {

  constructor(
    @InjectModel (Video.name) private readonly VideoModel: Model<VideoDocument>) {}
  
  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    return new this.VideoModel(CreateVideoDto).save();
  
  }

   async findAll() {
    return this.VideoModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}

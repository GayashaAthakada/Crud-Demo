import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import axios from "axios";
import { google } from 'googleapis';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

const youtube = google.youtube({
  version: "v3",
  auth: process.env.API_KEY,
});

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    // return this.videosService.create(createVideoDto);
  }

  @Get()
  findAll() {
    return this.videosService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':searchQuery')
  async findOne(@Param('searchQuery') searchQuery: string) {
    //return this.videosService.findOne(+id);
console.log(process.env.API_URL);
    const url = `${process.env.API_URL}/search?key=${process.env.API_KEY}&type=video&part=snippet&q=${searchQuery}&maxResults=15`;

    const response = await axios.get(url);
    const titles = response.data.items.map((item) => item);
    return titles;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }
}

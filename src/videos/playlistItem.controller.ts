import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import axios from "axios";

@Controller('playlistitem')
export class PlaylistItemController {
  constructor(private videosService: VideosService) {}

  @Get(':playListID')
  async findOne(@Param('playListID') playListID: string) {

    const url = `${process.env.API_PLAYLISTITEM_URL}?part=snippet%2CcontentDetails&maxResults=15&playlistId=${playListID}&key=${process.env.API_KEY}`;

    const response = await axios.get(url, 
      {
        headers: {
          'Authorization': `Bearer ${process.env.YOUTUBE_TOKEN}`,
          'Accept': 'application/json'
        }
      });
      
    const playlists = response.data.items.map((item) => item);
    return playlists;
  }

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {

    const url = `${process.env.API_PLAYLISTITEM_URL}?part=snippet&key=${process.env.API_KEY}`;
    axios
    .post(url, 
      {
        "snippet": {
          "playlistId": createVideoDto.playlistid,
          "position": 0,
          "resourceId": {
            "kind": "youtube#video",
            "videoId": createVideoDto.videoid
          }
        }
      },
    {
      headers: {
        'Authorization': `Bearer ${process.env.YOUTUBE_TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  .then((response) =>{
    console.log(response.data);
    return response.data;
  } )
  .catch(console.error);

  }

  @Put()
  Update(@Body() updateVideoDto: UpdateVideoDto): void {

    const url = `${process.env.API_PLAYLISTITEM_URL}?part=snippet&key=${process.env.API_KEY}`;
    axios
    .put(url, 
      {
        "id": updateVideoDto.playlistitemid,
        "snippet": {
          "playlistId": updateVideoDto.playlistid,
          "position": updateVideoDto.position,
          "resourceId": {
            "kind": "youtube#video",
            "videoId": updateVideoDto.videoid
          }
        }
      },
    {
      headers: {
        'Authorization': `Bearer ${process.env.YOUTUBE_TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  .then((response) =>{
    console.log(response.data);
    return response.data;
  } )
  .catch(console.error);

  }

  @Delete(':id')
  async remove(@Param('id') playListItemId: string) {

    const url = `${process.env.API_PLAYLISTITEM_URL}?id=${playListItemId}&key=${process.env.API_KEY}`;
    console.log(url);
    const response = await axios.delete(url, 
      {
        headers: {
          'Authorization': `Bearer ${process.env.YOUTUBE_TOKEN}`,
          'Accept': 'application/json'
        }
      });
    return 200;
  }
}
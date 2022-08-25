import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import axios from "axios";

@Controller('playlist')
export class PlaylistController {
  constructor(private videosService: VideosService) {}

  @Get()
  async findAll() {
    const url = `${process.env.API_PLAYLIST_URL}?part=snippet%2CcontentDetails&maxResults=25&mine=true&key=${process.env.API_KEY}`;

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

    const url = `${process.env.API_PLAYLIST_URL}?part=snippet%2Cstatus&key=${process.env.API_KEY}`;
      axios
      .post(url, 
        {
        "snippet": {
          "title": "Sample playlist created via API",
          "description": "This is a sample playlist description.",
          "tags": [
            "sample playlist",
            "API call"
          ],
          "defaultLanguage": "en"
        },
        "status": {
          "privacyStatus": "private"
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
}

import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AppService } from './app.service';

@Controller()
export class AppController {

    constructor(private readonly authservice : AuthService) {}


    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
      return this.authservice.login(req.user);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('protected')
    getHello(@Request() req): string {
      return req.user;
    } 

}


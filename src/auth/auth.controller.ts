import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login';
import { CurrentUser, Public } from './constants';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ILoggedUserInfo, JwtPayload } from './types';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/info')
  async userInfo(@CurrentUser() user: JwtPayload): Promise<ILoggedUserInfo> {
    return this.authService.getLoggedUserInfo(user.sub);
  }
}

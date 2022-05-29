import {
    Body,
    Req,
    Controller,
    HttpCode,
    Post,
    UseGuards,
    Get, ClassSerializerInterceptor, UseInterceptors,
  } from '@nestjs/common';
  import { AuthenticationService } from './auth.service';
  import RegisterDto from './dto/register.dto';
  import RequestWithUser from './requestWithUser.interface';
  import { LocalAuthenticationGuard } from './localAuthentication.guard';
  import JwtAuthenticationGuard from './jwt-authentication.guard';
  import { UsersService } from '../users/users.service';
  import JwtRefreshGuard from './jwt-refresh.guard';
  import { ApiBody, ApiTags } from '@nestjs/swagger';
  import LogInDto from './dto/logIn.dto';
  
  @ApiTags('Authentication')
  @Controller('authentication')
  @UseInterceptors(ClassSerializerInterceptor)
  export class AuthenticationController {
    constructor(
      private readonly authenticationService: AuthenticationService,
      private readonly usersService: UsersService,
    ) {}
  
    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
      const user = await this.authenticationService.register(registrationData);
      return user;
    }
  
    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('log-in')
    @ApiBody({ type: LogInDto })
    async logIn(@Req() request: RequestWithUser) {
      const { user } = request;
      const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(user.id);
      const {
        cookie: refreshTokenCookie,
        token: refreshToken
      } = this.authenticationService.getCookieWithJwtRefreshToken(user.id);
  
      await this.usersService.setCurrentRefreshToken(refreshToken, user.id);
  
      request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
  
      return {
        accessTokenCookie,
        refreshTokenCookie,
        user
      }
    }
  
    @UseGuards(JwtAuthenticationGuard)
    @Post('log-out')
    @HttpCode(200)
    async logOut(@Req() request: RequestWithUser) {
      await this.usersService.removeRefreshToken(request.user.id);
      request.res.setHeader('Set-Cookie', this.authenticationService.getCookiesForLogOut());
    }
  
    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
      return request.user;
    }
  
    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    refresh(@Req() request: RequestWithUser) {
      const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(request.user.id);
  
      request.res.setHeader('Set-Cookie', accessTokenCookie);
      return request.user;
    }
  }
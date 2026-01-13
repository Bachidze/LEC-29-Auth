import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './DTO/sign-up.dto';
import { SingInDto } from './DTO/sing-in.dto';
import { AuthGuard } from './guards/atuh.guard';
import { User } from 'src/decorators/user.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    example: 'created successfully',
  })
  @ApiBadRequestResponse({
    example: {
      message: 'user already exsists',
      error: 'bad request',
      status: 400,
    },
  })
  @Post('sign-up')
  signUp(@Body() singUpDto: SingUpDto) {
    return this.authService.singUp(singUpDto);
  }

  @ApiOkResponse({
    example: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTY2NmQyMDBiMzczMzlhZDg5MjM2YmQiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2ODMyMDc1NSwiZXhwIjoxNzY4MzI0MzU1fQ.dZDuygjdolGX5tNV_VznYvmSrrhJpV_ZH5HjDw5TWNw',
    },
  })
  @ApiBadRequestResponse({
    example: {
      message: 'bad request',
      status: 400,
    },
  })
  @Post('sign-in')
  singIn(@Body() singInDto: SingInDto) {
    return this.authService.singIn(singInDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    example: {
      message: {
        _id: '69666d200b37339ad89236bd',
        fullName: 'giorgi giorgadze',
        email: 'giorgi55@gmail.com',
        role: 'user',
        posts: [],
        createdAt: '2026-01-13T16:04:48.778Z',
        updatedAt: '2026-01-13T16:04:48.778Z',
        __v: 0,
      },
    },
  })
  @ApiBadRequestResponse({
    example:{
      message:"invalid credentials"
    }
  })
  @UseGuards(AuthGuard)
  @Get('current-user')
  currentUser(@User() userId) {
    return this.authService.currentUser(userId);
  }
}

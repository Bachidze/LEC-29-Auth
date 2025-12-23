import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './DTO/sign-up.dto';
import { SingInDto } from './DTO/sing-in.dto';
import { AuthGuard } from './guards/atuh.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  signUp(@Body() singUpDto:SingUpDto){
    return this.authService.singUp(singUpDto)
  }

  @Post("sign-in")
  singIn(@Body() singInDto:SingInDto){
    return this.authService.singIn(singInDto)
  }

  @UseGuards(AuthGuard)
  @Get("current-user")
  currentUser(@User() userId){
    return this.authService.currentUser(userId)
  }
}

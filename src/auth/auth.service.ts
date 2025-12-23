import { BadGatewayException, Injectable } from '@nestjs/common';
import { SingUpDto } from './DTO/sign-up.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt"
import { SingInDto } from './DTO/sing-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService:UsersService,private jwtService:JwtService){}

    async singUp(singUpDto:SingUpDto){
        const exsistingUser = await this.userService.findByEmail(singUpDto.email)
        if(exsistingUser) throw new BadGatewayException("user already exsits")
        const hashedPass = await bcrypt.hash(singUpDto.password,10)
        await this.userService.create({...singUpDto,password:hashedPass})
        return "created successfully"
    }

    async singIn(singInDto:SingInDto){
        const exsistingUser = await this.userService.findByEmail(singInDto.email)
        if(!exsistingUser) throw new BadGatewayException("invalid Credentials")
        const isPassEqual = await bcrypt.compare(singInDto.password,exsistingUser.password)
        if(!isPassEqual) throw new BadGatewayException("invalid Credentials")

          const payLoad = {
            userId:exsistingUser._id,
            role:exsistingUser.role
        }
        const accessToken = await this.jwtService.sign(payLoad,{expiresIn:"1h"})
        return {accessToken}
    }

    async currentUser(userId:string){
        const user = await this.userService.findOne(userId)
        return user
    }
}

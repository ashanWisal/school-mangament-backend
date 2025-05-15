import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto, SignUpDto } from './Entities/dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post()
    signup(@Body() signUpDto:SignUpDto):Promise<{ accessToken: string; refreshToken: string }>{
        return this.authService.signUp(signUpDto)
    }

    @Get()
    login(@Body() logingDto:LoginDto):Promise<{ accessToken: string; refreshToken: string }>{
        return this.authService.loginUser(logingDto)
    }
}

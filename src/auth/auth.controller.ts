import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto, SignUpDto } from './Entities/dtos/user.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('/signup')
    signup(@Body() signUpDto: SignUpDto): Promise<{ accessToken: string; refreshToken: string }> {
        console.log(signUpDto)
        return this.authService.signUp(signUpDto)
    }
    @Public()
    @Post('/login')
    login(@Body() loginDto: LoginDto): Promise<{ accessToken: string; refreshToken: string }> {
        console.log(loginDto)
        return this.authService.loginUser(loginDto);
    }
}

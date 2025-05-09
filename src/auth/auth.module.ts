import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './Entities/user.schema';



@Module({
  imports:[
    MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService)=>{
        return{
          secret: config.get<string>('JWT_SECRET'),
          // signOptions:{
          //   expiresIn: config.get<string | number>('JWT_EXPIRES')
          // }
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

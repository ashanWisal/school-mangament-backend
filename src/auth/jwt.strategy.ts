import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";
import { User } from "./Entities/user.schema";
import { Model } from "mongoose";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
constructor(@InjectModel(User.name) private userModel:Model<User> ){
    super({
        jwtFromRequest: ExtractJwt.fromAuthheaderAsBearerToken(),
        secretorkey: process.env.JWT_SECRET
    })
}

async validate(payload){
    const {id} = payload;
    const user = await this.userModel.findById(id)
    if(!user){
        throw new UnauthorizedException("Login first to access the endpoint")
    }
    return user
}
}
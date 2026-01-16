    import { Injectable, UnauthorizedException } from "@nestjs/common";
    import { PassportStrategy } from "@nestjs/passport";
    import { InjectRepository } from "@nestjs/typeorm";
    import { User } from "../users/entities/user.entity";
    import { Repository } from "typeorm";
    import { ExtractJwt, Strategy } from 'passport-jwt';

    @Injectable()
    export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
        constructor(
            @InjectRepository(User)
            private readonly userRepo: Repository<User>
        ){
            const jwtSecret = process.env.JWT_SECRET;
            if(!jwtSecret){
                throw new Error('JWT_SECRET environment variable is not defined')
            }
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: jwtSecret
            })
        }

    async validate(payload: any) {
        const user = await this.userRepo.findOne({ 
            where: { id: payload.sub },
            select: ['id', 'email', 'username', 'verified', 'avatar', "fullname"] // Chỉ lấy các trường cần thiết, không lấy password
        });
        
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        
        return user; // Trả về thông tin user đầy đủ
    }
    }
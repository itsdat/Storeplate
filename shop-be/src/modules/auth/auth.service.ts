import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { In, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { instanceToPlain } from 'class-transformer';
import { generateUsername } from 'src/utils/generateUsername.utils';
import { HttpStatusCode } from 'src/shared/enums/http-status.enum';
import { LoginDto } from './dto/login.dto';
import { IBaseCreatedRes } from 'src/shared/interfaces/common/IBaseRetun.interface';
import { ROLES } from 'src/shared/constants/common/role.contanst';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService
  ){}

  async register(dto: RegisterDto):Promise<IBaseCreatedRes>{
    const emailExist = await this.userRepo.findOne({where: {email: dto.email}});
    if (emailExist) {
      throw new BadRequestException('Email already exists');
    }

    const usernameExist = await this.userRepo.findOne({where: {username: dto.username}});
    if (usernameExist) {
      throw new BadRequestException('Username already exists');
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    try {
      const newUser = this.userRepo.create({
        email: dto.email,
        password: hashed,
        username: dto.username ?? generateUsername(dto.email),
        role: dto.role ?? ROLES.USER
      });
      const savedUser = await this.userRepo.save(newUser);

      return{
        data: instanceToPlain(savedUser),
        message: "User registered successfully",
        statusCode: 201
      }
    } catch (error) {
      throw new BadRequestException("Registration failed");
    }
  }

  async login(dto: LoginDto): Promise<IBaseCreatedRes>{
    const user = await this.userRepo.findOne({where: {email: dto.email, role: ROLES.USER}});
    if(!user){
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if(!isMatch){
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const payload = {email: user.email, sub: user.id}

    return{
      data: {
        access_token: await this.jwtService.signAsync(payload),
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role
        }
      },
      message: "Login Successful",
      statusCode: HttpStatusCode.OK
    }
  }

  async adminLogin(dto: LoginDto): Promise<IBaseCreatedRes>{
    const admin = await this.userRepo.findOne({where: {email: dto.email, role: In([ROLES.STAFF, ROLES.ADMIN]) }});
    if(!admin){
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const isMatch = await bcrypt.compare(dto.password, admin.password);
    if(!isMatch){
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const payload = {email: admin.email, sub: admin.id}

    return{
      data: {
        access_token: await this.jwtService.signAsync(payload),
        admin: {
          id: admin.id,
          email: admin.email,
          role: admin.role
        }
      },
      message: "Wellcome Admin!",
      statusCode: HttpStatusCode.OK
    }
  }

}

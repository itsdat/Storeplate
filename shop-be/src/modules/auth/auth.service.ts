import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { In, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { instanceToPlain } from 'class-transformer';
import { HttpStatusCode } from 'src/shared/enums/http-status.enum';
import { LoginDto } from './dto/login.dto';
import { IBaseCreatedRes, IBaseGetOneRes } from 'src/shared/interfaces/common/IBaseRetun.interface';
import { ROLES } from 'src/shared/constants/common/role.contanst';
import { MailService } from '../services/mail.service';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ){}

  async register(dto: RegisterDto):Promise<IBaseCreatedRes>{
    const emailExist = await this.userRepo.findOne({where: {email: dto.email}});
    if (emailExist) {
      throw new BadRequestException('Email already exists');
    }

    // const usernameExist = await this.userRepo.findOne({where: {username: dto.username}});
    // if (usernameExist) {
    //   throw new BadRequestException('Username already exists');
    // }

    const hashed = await bcrypt.hash(dto.password, 10);

    try {
      const newUser = this.userRepo.create({
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        password: hashed,
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
          firstName: user.firstName,
          lastName: user.lastName,
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

  async getMe(userId: string): Promise<IBaseGetOneRes>{
    if(!userId){
      throw new NotFoundException("User does not exist")
    }
    try {
      const data = await this.userRepo.findOne({where: {id: userId}});
      return{
        data: data,
        statusCode: HttpStatusCode.OK
      }
    } catch (error) {
      console.log("error fetching", error.message);
      throw new BadRequestException("Fetching fail")
    }
  }

  async sendVerifyEmail(user: User) {
    try {
      const verifyToken = this.jwtService.sign(
        { sub: user.id },
        {
          secret: process.env.JWT_VERIFY_SECRET,
          expiresIn: '15m',
        },
      );

      await this.mailService.sendVerifyEmail(user.email, verifyToken);
      return {
        message: 'Please check your email to verify account.',
        statusCode: 200,
      };
    } catch (error) {
      console.error('Send verify email failed:', error.message);
    }
  }

  async verifyEmailToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_VERIFY_SECRET,
      });

      await this.userRepo.update(payload.sub, {
        verified: true,
      });

      return {
        message: 'Email verified successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw new BadRequestException('Invalid or expired token');
    }
  }

}

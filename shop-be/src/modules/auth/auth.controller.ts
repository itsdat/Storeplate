import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
@ApiBearerAuth('access_token')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Email already exists' })
  async register(
    @Body() authDto: RegisterDto
  ){
    return this.authService.register(authDto)
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  async login(
    @Body() authDto: LoginDto
  ){
    return this.authService.login(authDto)
  }

  @Post('admin/login')
  @ApiOperation({ summary: 'Login admin' })
  @ApiResponse({ status: 200, description: 'Admin login successful' })
  async adminLogin(
    @Body() authDto: LoginDto
  ){
    return this.authService.adminLogin(authDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-me')
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200, description: 'Success' })
  getMe(@CurrentUser() user: User){
    return this.authService.getMe(user?.id)
  }
}

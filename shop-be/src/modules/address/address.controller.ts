import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('address')
@ApiBearerAuth('access_token')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(JwtAuthGuard)
  @Post("create")
  create(@CurrentUser() user: User , @Body() createAddressDto: CreateAddressDto) {
    console.log("user", user?.id);
    
    return this.addressService.create(user?.id, createAddressDto);
  }

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('find-multi')
  findMulti(@CurrentUser() user: User) {
    return this.addressService.findMulti(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}

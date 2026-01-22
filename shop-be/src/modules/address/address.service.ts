import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { IBaseCreatedRes, IBaseGetAllRes } from 'src/shared/interfaces/common/IBaseRetun.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { HttpStatusCode } from 'src/shared/enums/http-status.enum';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>
  ){}
  
  async create( userId: string, createAddressDto: CreateAddressDto): Promise<IBaseCreatedRes> {
    try {
      const newData = {
        ... createAddressDto,
        userId: userId
      }
      return{
        data: await this.addressRepo.save(newData),
        message: "Create new address successfull",
        statusCode: HttpStatusCode.CREATED
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  findAll() {
    return `This action returns all address`;
  }

  async findMulti(userId: string): Promise<IBaseGetAllRes> {
    try {
      const data = await this.addressRepo.find({where: {userId}, relations: ['user']})
      return{
        data: data,
        statusCode: HttpStatusCode.OK,
        totalItems: data.length,
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}

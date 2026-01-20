import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Voucher } from './entities/voucher.entity';
import { Repository } from 'typeorm';
import { IBaseCreatedRes, IBaseGetAllRes } from 'src/shared/interfaces/common/IBaseRetun.interface';
import { HttpStatusCode } from 'src/shared/enums/http-status.enum';

@Injectable()
export class VoucherService {

  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepo: Repository<Voucher>
  ){}

  async create(createVoucherDto: CreateVoucherDto): Promise<IBaseCreatedRes> {
    if(await this.voucherRepo.findOneBy({code: createVoucherDto.code})){
      throw new BadRequestException("Voucher code already exists");
    }
   try {
     const newItem = this.voucherRepo.create(createVoucherDto);
    return{
      data: await this.voucherRepo.save(newItem),
      message: "Voucher created successfully",
      statusCode: HttpStatusCode.CREATED
    }
   } catch (error: any) {
     throw new BadRequestException("Failed", error.message)
   }
  }

  async findMulti(): Promise<IBaseGetAllRes>{
    try {
      const data = await this.voucherRepo.find({where: {isActive: true}});
      return {
        data: data,
        statusCode: HttpStatusCode.OK,
        totalItems: data.length
      }
    } catch (error) {
      throw new BadRequestException("Failed", error.message)
    }
  }

  findAll() {
    return `This action returns all voucher`;
  }

  findOne(id: number) {
    return `This action returns a #${id} voucher`;
  }

  update(id: number, updateVoucherDto: UpdateVoucherDto) {
    return `This action updates a #${id} voucher`;
  }

  remove(id: number) {
    return `This action removes a #${id} voucher`;
  }
}

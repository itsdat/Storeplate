import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { HttpStatusCode } from 'src/shared/enums/http-status.enum';

@Injectable()
export class TagService {
  constructor(
      @InjectRepository(Tag)
      private readonly tagRepo: Repository<Tag> 
    ){}
  
  async create(createTagDto: CreateTagDto) {
    const exists = await this.tagRepo.findOne({where: {label: createTagDto.label}})
      if(exists){
        throw new BadRequestException("Tag name is already exists")
      }
  
      try {
        const newTag = this.tagRepo.create(createTagDto)
        return {
          data: await this.tagRepo.save(newTag),
          message: "Tag created successfully",
          statusCode: HttpStatusCode.CREATED
        }
      } catch (error) {
        console.log("error creating Tag", error);
        throw new BadRequestException("Failed to create Tag")
      }
  }


  findAll() {
    return `This action returns all tag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}

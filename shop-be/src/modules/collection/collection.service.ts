import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Repository } from 'typeorm';
import { Collection } from './entities/collection.entity';
import { HttpStatusCode } from 'src/shared/enums/http-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { IBaseCreatedRes, IBaseGetAllRes, IBaseUpdatedRes } from 'src/shared/interfaces/common/IBaseRetun.interface';

@Injectable()
export class CollectionService {

  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepo: Repository<Collection>
  ){}

  async create(createCollectionDto: CreateCollectionDto): Promise<IBaseCreatedRes> {
    const exists = await this.collectionRepo.findOne({where: {name: createCollectionDto.name}})
    if(exists){
      throw new BadRequestException("Collection name is already exists")
    }
    try {
      const newCollection = this.collectionRepo.create(createCollectionDto)
      return {
        data: await this.collectionRepo.save(newCollection),
        message: "Collection created successfully",
        statusCode: HttpStatusCode.CREATED
      }
    } catch (error) {
      throw new BadRequestException("Failed to create collection")
    }
  }
  
  async update(id: string, updateCollectionDto: UpdateCollectionDto): Promise<IBaseUpdatedRes> {
    // check exists collection
    const collection = await this.collectionRepo.findOne({where: {id}});
    if(!collection){
      throw new NotFoundException("Collection not found")
    }

    try {
      const newData = this.collectionRepo.merge(collection, updateCollectionDto);
      await this.collectionRepo.save(newData);
      
      return{
        message: 'Update successful',
        statusCode: HttpStatusCode.OK
      }
    } catch (error) {
      console.log("error updating collection", error);
      throw new BadRequestException("Update fail")
    }
  }

  async findAll(): Promise<IBaseGetAllRes> {
    try {
      const data = await this.collectionRepo.find({
        order: {createdAt: 'DESC'}
      })
      return {
        data: data,
        statusCode: HttpStatusCode.OK,
        totalItems: data.length
      }
    } catch (error) {
      console.log("error fetching", error);
      throw new BadRequestException("Fetching fail")
    }
  }

  async findMulti(): Promise<IBaseGetAllRes> {
    try {
      const data = await this.collectionRepo.find({
        where: {isActive: true},
        order: {createdAt: 'DESC'}
      })
      return {
        data: data,
        statusCode: HttpStatusCode.OK,
        totalItems: data.length
      }
    } catch (error) {
      console.log("error fetching", error);
      throw new BadRequestException("Fetching fail")
    }
  }

  async remove(id: string): Promise<IBaseUpdatedRes> {
     // check exists collection
    const collection = await this.collectionRepo.findOne({where: {id, isActive: true}});
    if(!collection){
      throw new NotFoundException("Collection not found")
    }

    try {
      const newData = this.collectionRepo.merge(collection, {isActive: false});
      await this.collectionRepo.save(newData);
      
      return{
        message: 'Remove successfull',
        statusCode: HttpStatusCode.OK
      }
    } catch (error) {
      console.log("error remove collection", error);
      throw new BadRequestException("Remove fail")
    }
  }

  async restore(id: string): Promise<IBaseUpdatedRes> {
     // check exists collection
    const collection = await this.collectionRepo.findOne({where: {id, isActive: false}});
    if(!collection){
      throw new NotFoundException("Collection not found")
    }

    try {
      const newData = this.collectionRepo.merge(collection, {isActive: true});
      await this.collectionRepo.save(newData);
      
      return{
        message: 'Restore successfull',
        statusCode: HttpStatusCode.OK
      }
    } catch (error) {
      console.log("error restore collection", error);
      throw new BadRequestException("Restore fail")
    }
  }
}

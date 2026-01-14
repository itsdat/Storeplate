import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('collection')
@ApiBearerAuth('access_token')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() createCollectionDto: CreateCollectionDto) {
    return await this.collectionService.create(createCollectionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/find-all")
  findAll() {
    return this.collectionService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Get("/find-multi")
  findMulti() {
    return this.collectionService.findMulti();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollectionDto: UpdateCollectionDto) {
    return this.collectionService.update(id, updateCollectionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('soft-delete/:id')
  remove(@Param('id') id: string) {
    return this.collectionService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('restore/:id')
  restore(@Param('id') id: string) {
    return this.collectionService.restore(id);
  }
}

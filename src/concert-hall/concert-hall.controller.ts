import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateConcertHallDto } from './dto/create-concert-hall.dto';
import { UpdateConcertHallDto } from './dto/update-concert-hall.dto';
import { ConcertHallService } from './concert-hall.service';

@Controller('concert-hall')
export class ConcertHallController {
  constructor(private readonly concertHallService: ConcertHallService) {}

  // 콘서트홀 생성
  @Post()
  async create(@Body() createConcertHallDto: CreateConcertHallDto) {
    return this.concertHallService.create(createConcertHallDto);
  }

  // 콘서트홀 수정
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateConcertHallDto: UpdateConcertHallDto,
  ) {
    return this.concertHallService.update(id, updateConcertHallDto);
  }

  // 콘서트홀 삭제
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.concertHallService.remove(id);
  }
}

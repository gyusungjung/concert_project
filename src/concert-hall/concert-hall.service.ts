import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConcertHall } from './entities/concert-hall.entity';
import { CreateConcertHallDto } from './dto/create-concert-hall.dto';
import { UpdateConcertHallDto } from './dto/update-concert-hall.dto';

@Injectable()
export class ConcertHallService {
  constructor(
    @InjectRepository(ConcertHall)
    private readonly concertHallRepository: Repository<ConcertHall>,
  ) {}

  // 콘서트홀 생성
  async create(
    createConcertHallDto: CreateConcertHallDto,
  ): Promise<ConcertHall> {
    const concertHall = this.concertHallRepository.create(createConcertHallDto);
    return this.concertHallRepository.save(concertHall);
  }

  // 콘서트홀 수정
  async update(
    id: number,
    updateConcertHallDto: UpdateConcertHallDto,
  ): Promise<void> {
    await this.concertHallRepository.update(id, updateConcertHallDto);
  }

  // 콘서트홀 삭제
  async remove(id: number): Promise<void> {
    await this.concertHallRepository.delete(id);
  }
}

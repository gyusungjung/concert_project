import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Concert } from './entities/concert.entity';
import { ConcertController } from './concert.controller';
import { ConcertService } from './concert.service';

@Module({
  imports: [TypeOrmModule.forFeature([Concert])],
  providers: [ConcertService],
  controllers: [ConcertController],
})
export class ConcertModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConcertHall } from './entities/concert-hall.entity';
import { ConcertHallService } from './concert-hall.service';
import { ConcertHallController } from './concert-hall.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ConcertHall])],
  providers: [ConcertHallService],
  controllers: [ConcertHallController],
})
export class ConcertHallModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { ConcertHall } from 'src/concert-hall/entities/concert-hall.entity';
import { Concert } from 'src/concert/entities/concert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, ConcertHall, Concert])],
  providers: [ScheduleService],
  controllers: [ScheduleController],
})
export class ScheduleModule {}

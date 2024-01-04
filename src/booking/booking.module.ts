import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'src/user/user.module';
import { Booking } from './entities/booking.entity';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { ConcertHall } from 'src/concert-hall/entities/concert-hall.entity';
import { Concert } from 'src/concert/entities/concert.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, Schedule, ConcertHall, Concert]),
    UserModule,
  ],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}

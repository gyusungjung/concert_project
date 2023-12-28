import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    // 추가적인 의존성 주입이 필요한 경우 여기에 추가
  ) {}

  async create(
    scheduleId: number,
    createBookingDto: CreateBookingDto,
    userId: number,
  ): Promise<Booking> {
    // 스케줄 및 사용자 정보 확인 로직 (예: 스케줄 존재 여부, 좌석의 유효성 등)

    // 예약 객체 생성
    const booking = this.bookingRepository.create({
      scheduleId,
      userId,
      seatNum: createBookingDto.seat_num,
      // 추가 필드 설정 (예: grade, status 등)
    });

    // 예약 저장
    await this.bookingRepository.save(booking);

    return booking;
  }

  // 기타 서비스 메서드
}

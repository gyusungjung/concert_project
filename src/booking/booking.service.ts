import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { ConcertHall } from 'src/concert-hall/entities/concert-hall.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(ConcertHall)
    private readonly concertHallRepository: Repository<ConcertHall>,
  ) {}

  async create(
    scheduleId: number,
    createBookingDto: CreateBookingDto,
    userId: number,
  ): Promise<Booking> {
    // 스케줄 및 사용자 정보 확인 로직
    const schedule = await this.scheduleRepository.findOne({
      where: { scheduleId },
      relations: ['concertHall'],
    });
    if (!schedule) {
      throw new NotFoundException('해당 스케줄을 찾을 수 없습니다.');
    }

    const { seatNum } = createBookingDto;
    const { concertHall } = schedule;
    const totalSeats =
      concertHall.gradeS + concertHall.gradeA + concertHall.gradeB;

    // 좌석 번호 유효성 검사
    if (seatNum < 1 || seatNum > totalSeats) {
      throw new BadRequestException('유효하지 않은 좌석 번호입니다.');
    }

    // 좌석 등급 결정
    let grade: string;
    let price: number;
    if (seatNum <= concertHall.gradeS) {
      grade = 'S';
      price = schedule.priceS;
    } else if (seatNum <= concertHall.gradeS + concertHall.gradeA) {
      grade = 'A';
      price = schedule.priceA;
    } else {
      grade = 'B';
      price = schedule.priceB;
    }

    // 예약 객체 생성
    const booking = this.bookingRepository.create({
      scheduleId,
      userId,
      seatNum,
      grade,
      price,
      // status: 'buy',
      // 추가 필드 설정 (예: grade, status 등)
    });

    // 예약 저장
    await this.bookingRepository.save(booking);

    return booking;
  }

  // 기타 서비스 메서드
}

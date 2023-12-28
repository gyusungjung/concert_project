import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express'; // express의 Request 타입을 임포트합니다.
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post(':scheduleId')
  async createBooking(
    @Param('scheduleId') scheduleId: number,
    @Body() createBookingDto: CreateBookingDto,
    @Req() req: Request, // 현재 요청의 Request 객체를 주입받습니다.
  ) {
    const userId = req.user?.userId; // JWT 인증 미들웨어를 통해 설정된 사용자 ID를 가져옵니다.
    if (!userId) {
      // userId가 없는 경우의 처리 (예: 에러 반환)
    }
    return this.bookingService.create(scheduleId, createBookingDto, userId);
  }
}

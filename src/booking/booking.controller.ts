import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { AuthenticatedRequest } from '../common/authenticated-request.interface';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post(':scheduleId')
  async createBooking(
    @Param('scheduleId') scheduleId: number,
    @Body() createBookingDto: CreateBookingDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user?.userId;
    if (!userId) {
      // userId가 없는 경우의 처리 (예: 에러 반환)
    }
    return this.bookingService.create(scheduleId, createBookingDto, userId);
    //console.log(req);
    //return 'check';
  }
}

import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedRequest } from '../common/authenticated-request.interface';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post(':scheduleId')
  async createBooking(
    @Param('scheduleId') scheduleId: number,
    @Body() createBookingDto: CreateBookingDto,
    @Req() req: AuthenticatedRequest,
  ) {
    console.log('req:', req);
    console.log('req user---------------:', req.user);
    const userId = req.user?.userId;
    console.log('userId:', userId);
    if (!userId) {
      throw new UnauthorizedException();
    }
    console.log('------------------------------------------');
    console.log('req:', req);
    console.log('scheduleId:', scheduleId);
    console.log('userId:', userId);
    console.log('createBookingDto:', createBookingDto);
    return this.bookingService.create(scheduleId, createBookingDto, userId);
  }
}

import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  @IsNotEmpty({ message: '좌석 번호를 입력해주세요.' })
  seatNum: number;

  // scheduleId는 URL의 파라미터로 받을예정.
}

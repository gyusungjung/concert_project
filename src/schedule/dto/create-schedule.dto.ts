import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateScheduleDto {
  @IsInt()
  @IsNotEmpty({ message: '공연장 ID를 입력해주세요.' })
  hallId: number;

  @IsInt()
  @IsNotEmpty({ message: '공연 ID를 입력해주세요.' })
  concertId: number;

  @IsDateString({}, { message: '올바른 날짜 및 시간 형식을 입력해주세요.' })
  startAt: string;

  @IsInt()
  @IsOptional()
  priceS: number | null;

  @IsInt()
  @IsOptional()
  priceA: number | null;

  @IsInt()
  @IsOptional()
  priceB: number | null;

  @IsEnum(['Sold_out', 'On_sale'], {
    message: '올바른 공연 상태를 입력해주세요.',
  })
  status: 'Sold_out' | 'On_sale' = 'On_sale';
}

import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateConcertHallDto {
  @IsString()
  @IsNotEmpty({ message: '공연장 이름을 입력해주세요.' })
  hallName: string;

  @IsInt()
  @IsOptional()
  gradeS: number;

  @IsInt()
  @IsOptional()
  gradeA: number;

  @IsInt()
  @IsOptional()
  gradeB: number;
}

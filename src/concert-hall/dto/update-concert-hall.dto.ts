import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateConcertHallDto {
  @IsString()
  @IsOptional()
  hallName?: string;

  @IsInt()
  @IsOptional()
  gradeS?: number;

  @IsInt()
  @IsOptional()
  gradeA?: number;

  @IsInt()
  @IsOptional()
  gradeB?: number;
}

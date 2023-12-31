import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class UpdateConcertDto {
  @IsString()
  @IsNotEmpty({ message: '공연이름을 입력해주세요.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '카테고리를 입력해주세요.' })
  category: string;

  @IsString()
  @IsNotEmpty({ message: '공연 소개를 입력해주세요.' })
  description: string;

  @IsString()
  @IsOptional()
  image: string =
    'https://img.khan.co.kr/news/2023/05/02/news-p.v1.20230501.5bd1efe8dc5e47d6a7c3af0f3b1eb81d_P1.webp';

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ConcertHall } from 'src/concert-hall/entities/concert-hall.entity';
import { Concert } from 'src/concert/entities/concert.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(ConcertHall)
    private readonly concertHallRepository: Repository<ConcertHall>,
    @InjectRepository(Concert)
    private readonly concertRepository: Repository<Concert>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const { hallId, concertId, startAt, priceS, priceA, priceB } =
      createScheduleDto;

    // 공연장과 공연의 존재 유효성 검사
    const concertHall = await this.concertHallRepository.findOneBy({ hallId });
    if (!concertHall) {
      throw new NotFoundException(`공연장 ID ${hallId}을 찾을 수 없습니다.`);
    }

    const concert = await this.concertRepository.findOneBy({ concertId });
    if (!concert) {
      throw new NotFoundException(`공연 ID ${concertId}을 찾을 수 없습니다.`);
    }

    // 시작 시간이 미래인지 확인
    if (new Date(startAt) <= new Date()) {
      throw new BadRequestException('공연 시작 시간은 미래여야 합니다.');
    }

    //좌석 가격이 최대 5만원, 5만원 넘으면 오류
    if (priceS > 50000 || priceA > 50000 || priceB > 50000) {
      throw new BadRequestException('좌석 가격은 5만원을 넘길 수 없습니다.');
    }

    // 스케줄 생성
    const schedule = this.scheduleRepository.create({
      concertHall,
      concert,
      startAt,
      priceS,
      priceA,
      priceB,
      status: 'On_sale', // 기본 상태 설정
    });
    await this.scheduleRepository.save(schedule);
    return schedule;
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { ConcertHallService } from './concert-hall.service';

describe('ConcertHallService', () => {
  let service: ConcertHallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConcertHallService],
    }).compile();

    service = module.get<ConcertHallService>(ConcertHallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

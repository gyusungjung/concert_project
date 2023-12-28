import { Test, TestingModule } from '@nestjs/testing';
import { ConcertHallController } from './concert-hall.controller';

describe('ConcertHallController', () => {
  let controller: ConcertHallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcertHallController],
    }).compile();

    controller = module.get<ConcertHallController>(ConcertHallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

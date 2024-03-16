import { Test, TestingModule } from '@nestjs/testing';
import { PeopleInfoService } from './people-info.service';

describe('PeopleInfoService', () => {
  let service: PeopleInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeopleInfoService],
    }).compile();

    service = module.get<PeopleInfoService>(PeopleInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

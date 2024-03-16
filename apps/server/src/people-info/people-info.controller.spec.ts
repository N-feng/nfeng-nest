import { Test, TestingModule } from '@nestjs/testing';
import { PeopleInfoController } from './people-info.controller';

describe('PeopleInfoController', () => {
  let controller: PeopleInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleInfoController],
    }).compile();

    controller = module.get<PeopleInfoController>(PeopleInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

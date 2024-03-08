import { Test, TestingModule } from '@nestjs/testing';
import { ProductCateController } from './product-cate.controller';

describe('ProductCateController', () => {
  let controller: ProductCateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCateController],
    }).compile();

    controller = module.get<ProductCateController>(ProductCateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

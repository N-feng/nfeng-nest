import { Test, TestingModule } from '@nestjs/testing';
import { ProductCateService } from './product-cate.service';

describe('ProductCateService', () => {
  let service: ProductCateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductCateService],
    }).compile();

    service = module.get<ProductCateService>(ProductCateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

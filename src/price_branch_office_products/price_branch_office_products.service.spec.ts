import { Test, TestingModule } from '@nestjs/testing';
import { PriceBranchOfficeProductsService } from './price_branch_office_products.service';

describe('PriceBranchOfficeProductsService', () => {
  let service: PriceBranchOfficeProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceBranchOfficeProductsService],
    }).compile();

    service = module.get<PriceBranchOfficeProductsService>(PriceBranchOfficeProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

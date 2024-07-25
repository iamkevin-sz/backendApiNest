import { Test, TestingModule } from '@nestjs/testing';
import { PriceBranchOfficeProductsController } from './price_branch_office_products.controller';
import { PriceBranchOfficeProductsService } from './price_branch_office_products.service';

describe('PriceBranchOfficeProductsController', () => {
  let controller: PriceBranchOfficeProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceBranchOfficeProductsController],
      providers: [PriceBranchOfficeProductsService],
    }).compile();

    controller = module.get<PriceBranchOfficeProductsController>(PriceBranchOfficeProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

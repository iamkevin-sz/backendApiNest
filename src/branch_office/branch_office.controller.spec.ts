import { Test, TestingModule } from '@nestjs/testing';
import { BranchOfficeController } from './branch_office.controller';
import { BranchOfficeService } from './branch_office.service';

describe('BranchOfficeController', () => {
  let controller: BranchOfficeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BranchOfficeController],
      providers: [BranchOfficeService],
    }).compile();

    controller = module.get<BranchOfficeController>(BranchOfficeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

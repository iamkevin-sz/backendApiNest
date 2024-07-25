import { Test, TestingModule } from '@nestjs/testing';
import { BranchOfficeService } from './branch_office.service';

describe('BranchOfficeService', () => {
  let service: BranchOfficeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BranchOfficeService],
    }).compile();

    service = module.get<BranchOfficeService>(BranchOfficeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

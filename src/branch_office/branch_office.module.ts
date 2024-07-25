import { Module } from '@nestjs/common';
import { BranchOfficeService } from './branch_office.service';
import { BranchOfficeController } from './branch_office.controller';
import { BranchOffice } from './entities/branch_office.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsUniqueUpdateConstraint } from 'src/common/validators/isUniqueUpdate';

@Module({
  imports: [TypeOrmModule.forFeature([BranchOffice])],
  controllers: [BranchOfficeController],
  providers: [BranchOfficeService, IsUniqueUpdateConstraint],
  exports: [TypeOrmModule],
})
export class BranchOfficeModule {}

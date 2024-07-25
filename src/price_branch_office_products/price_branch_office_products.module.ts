import { Module } from '@nestjs/common';
import { PriceBranchOfficeProductsService } from './price_branch_office_products.service';
import { PriceBranchOfficeProductsController } from './price_branch_office_products.controller';
import { PriceBranchOfficeProduct } from './entities/price_branch_office_product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PriceBranchOfficeProduct])],
  controllers: [PriceBranchOfficeProductsController],
  providers: [PriceBranchOfficeProductsService],
})
export class PriceBranchOfficeProductsModule {}

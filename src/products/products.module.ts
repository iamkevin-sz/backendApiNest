import { Module } from '@nestjs/common';

import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceBranchOfficeProduct } from 'src/price_branch_office_products/entities/price_branch_office_product.entity';
import { BranchOfficeModule } from 'src/branch_office/branch_office.module';
import { ValidationService } from './producto-valid.service';
import { ProductsService } from './products.service';
@Module({
  imports: [TypeOrmModule.forFeature([Product, PriceBranchOfficeProduct]), BranchOfficeModule],
  controllers: [ProductsController],
  providers: [ProductsService,ValidationService ],
})
export class ProductsModule {}

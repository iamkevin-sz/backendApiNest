import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PriceBranchOfficeProductsService } from './price_branch_office_products.service';
import { CreatePriceBranchOfficeProductDto } from './dto/create-price_branch_office_product.dto';
import { UpdatePriceBranchOfficeProductDto } from './dto/update-price_branch_office_product.dto';

@Controller('price-branch-office-products')
export class PriceBranchOfficeProductsController {
  constructor(private readonly priceBranchOfficeProductsService: PriceBranchOfficeProductsService) {}

  @Post()
  create(@Body() createPriceBranchOfficeProductDto: CreatePriceBranchOfficeProductDto) {
    return this.priceBranchOfficeProductsService.create(createPriceBranchOfficeProductDto);
  }

  @Get()
  findAll() {
    return this.priceBranchOfficeProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.priceBranchOfficeProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePriceBranchOfficeProductDto: UpdatePriceBranchOfficeProductDto) {
    return this.priceBranchOfficeProductsService.update(+id, updatePriceBranchOfficeProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.priceBranchOfficeProductsService.remove(+id);
  }
}

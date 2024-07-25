import { Injectable } from '@nestjs/common';
import { CreatePriceBranchOfficeProductDto } from './dto/create-price_branch_office_product.dto';
import { UpdatePriceBranchOfficeProductDto } from './dto/update-price_branch_office_product.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceBranchOfficeProduct } from './entities/price_branch_office_product.entity';
import { runInThisContext } from 'vm';
@Injectable()
export class PriceBranchOfficeProductsService {

  constructor(
    @InjectRepository(PriceBranchOfficeProduct)
    private priceBranchOfficeProduct: Repository<PriceBranchOfficeProduct>,
  ) {}
  create(createPriceBranchOfficeProductDto: CreatePriceBranchOfficeProductDto) {
    return this.priceBranchOfficeProduct.save(createPriceBranchOfficeProductDto);    
  }

  findAll() {
    return this.priceBranchOfficeProduct.find();
  }

  findOne(id: number) {
    return this.priceBranchOfficeProduct.findOneBy({id})
  }

  update(id: number, updatePriceBranchOfficeProductDto: UpdatePriceBranchOfficeProductDto) {
    return this.priceBranchOfficeProduct.update(id, updatePriceBranchOfficeProductDto);
  }

  remove(id: number) {
    return this.priceBranchOfficeProduct.delete(id);
  }
}

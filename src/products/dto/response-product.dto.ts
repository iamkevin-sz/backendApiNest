import { Expose, Type } from 'class-transformer';
import { ResponsePriceBranchOfficeProductDto } from 'src/price_branch_office_products/dto/response-price_branch_office_product.dto';
export class ResponseProductDto {
    @Expose()
    id: number;
  
    @Expose()
    name: string;
  
    @Expose()
    @Type(() => ResponsePriceBranchOfficeProductDto)
    priceBranchOfficeProducts: ResponsePriceBranchOfficeProductDto[];
  }
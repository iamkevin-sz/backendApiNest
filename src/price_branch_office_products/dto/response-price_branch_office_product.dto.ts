import { Exclude, Expose, Type } from 'class-transformer';

// DTO para PriceBranchOfficeProduct
export class ResponsePriceBranchOfficeProductDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  branch_office_id: number;

  // Excluimos la propiedad 'product' para evitar la referencia circular
  @Exclude()
  product: any;
}
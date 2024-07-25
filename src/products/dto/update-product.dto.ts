import { UpdatePriceBranchOfficeProductDto } from 'src/price_branch_office_products/dto/update-price_branch_office_product.dto';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class UpdateProductDto {
  @IsOptional()
  @IsNumber()
  id?: number; // Incluye el campo id si necesitas asignarlo en el controlador

  @Transform(({ value }) => value.toLowerCase())
  @IsString()
  @IsNotEmpty()
  name: string;

  // @IsArray()
  // @ValidateNested({ each: true })
  @Type(() => UpdatePriceBranchOfficeProductDto)
  @IsArray()
  @ValidateNested({ each: true })
  priceBranchOfficeProducts: UpdatePriceBranchOfficeProductDto[];
  // readonly priceBranchOfficeProducts?: UpdatePriceBranchOfficeProductDto[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Transform(({ value }) => value.map((id: string) => parseInt(id, 10)), {
    toClassOnly: true,
  })
  branchOfficesToDelete?: number[];
}

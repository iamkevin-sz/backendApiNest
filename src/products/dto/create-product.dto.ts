import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { IsUnique } from "src/common/validators/is-unique-validator";
import { CreatePriceBranchOfficeProductDto } from "src/price_branch_office_products/dto/create-price_branch_office_product.dto";
import { Product } from "../entities/product.entity";
import { Transform } from "class-transformer";

export class CreateProductDto {
    
    @IsUnique(Product, 'name', { message: 'Nombre del producto ya existe' })
    @IsNotEmpty({ message: 'El nombre del producto no puede estar vacío' })
    @IsString()
    @Transform(({ value }) => value.toLowerCase())
    name: string;

    @IsArray()
    priceBranchOfficeProducts: CreatePriceBranchOfficeProductDto[];

}

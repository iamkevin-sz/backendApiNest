import { IsDecimal, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePriceBranchOfficeProductDto {

    @IsNotEmpty({ message: 'El precio del producto no puede estar vacío' })
    @IsDecimal()
    price: number;
    @IsNumber()
    @IsNotEmpty()
    branch_office_id: number;
    @IsNumber()
    @IsNotEmpty()
    product_id: number;
}

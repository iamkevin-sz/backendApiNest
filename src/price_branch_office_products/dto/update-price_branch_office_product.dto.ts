import { Transform } from 'class-transformer';
import { IsDecimal, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdatePriceBranchOfficeProductDto {
    @IsOptional()
    @IsNumber()
    id?: number;
    
    @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
    @IsNotEmpty({ message: 'El precio del producto no puede estar vacío' })
    @IsNumber({ maxDecimalPlaces: 2 })
    // @IsDecimal({}, { message: 'El precio debe ser un número decimal válido' })
    price: number; // Mantener como string para validación

    @IsNumber({}, { message: 'branch_office_id debe ser un número válido' })
    @IsNotEmpty({ message: 'branch_office_id no puede estar vacío' })
    branch_office_id: number;

    @Transform(({ value }) => Number(value), { toClassOnly: true })
    @IsOptional()
    @IsNumber({}, { message: 'product_id debe ser un número válido' })
    @IsNotEmpty({ message: 'product_id no puede estar vacío' })
    product_id?: number;
}

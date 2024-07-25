import { IsUnique } from "src/common/validators/is-unique-validator";
import { BranchOffice } from "../entities/branch_office.entity";
import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";


export class CreateBranchOfficeDto {
    @IsUnique(BranchOffice, 'name', { message: 'Nombre del sucursal ya existe' })
    @Transform(({ value }) => value.toLowerCase())
    name: string;
    // @IsUnique(BranchOffice, 'location', { message: 'Nombre de la ubicacion ya existe' })
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    location: string;
}

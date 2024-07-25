import { IsNotEmpty } from 'class-validator';
import { IsUniqueUpdate } from 'src/common/validators/isUniqueUpdate';
import { BranchOffice } from '../entities/branch_office.entity';
import { Transform } from 'class-transformer';

export class UpdateBranchOfficeDto {
    @IsNotEmpty()
    @IsUniqueUpdate(BranchOffice, 'name', (object: UpdateBranchOfficeDto) => object.id)
    @Transform(({ value }) => value.toLowerCase())
    name: string;
    @Transform(({ value }) => value.toLowerCase())
    @IsNotEmpty()
    location: string;

    id: number;
}

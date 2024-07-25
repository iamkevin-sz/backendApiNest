import { IsOptional, IsString, IsNumber, IsIn, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class SortProductDto {
    @IsOptional()
    @IsString()
    sortField?: string;
  
    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    sortOrder?: 'ASC' | 'DESC';

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => parseInt(value, 10))
    page?: number; // Default to page 1 if not provided

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(10)
    @Transform(({ value }) => parseInt(value, 10))
    pageSize?: number; // Default to 10 items per page if not provided
}

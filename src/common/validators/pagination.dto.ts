import { IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class PaginationDto{
    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    limit?: number;
    @IsNumber()
    @IsOptional()
    @IsPositive()
    offset?: number;

}
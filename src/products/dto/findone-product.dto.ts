import { IsInt, Min } from 'class-validator';

export class FindOneProductDto {
  @IsInt({ message: 'El ID debe ser un número entero.' })
  @Min(1, { message: 'El ID debe ser un número positivo.' })
  id: number;
}
import { Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { FindOneProductDto } from './dto/findone-product.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidationService {
  async validateId(id: number) {
    const findOneProductDto = new FindOneProductDto();
    findOneProductDto.id = id;
    try {
      await validateOrReject(findOneProductDto);
    } catch (errors) {
      throw new BadRequestException('ID inválido.');
    }
  }
}

import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource } from 'typeorm';
import { HttpException, HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private dataSource: DataSource) {}
  // value is the value of the property being validated in this case is the name
  // the properties is the name of the property being validated in this case is the name
  // example name = 'username', property = 'value'
  // entityClass = BranchOffice
  //!entity uses the logical NOT operator.
  // If entity is null (no entity found), !entity will be true.
  // If entity is not null (entity found), !entity will be false.
  async validate(value: any, args: ValidationArguments) {
    const [entityClass, property] = args.constraints;
    console.log('see', { entityClass, property, value, args });
    const repository = this.dataSource.getRepository(entityClass);
    try{
    const entity = await repository.findOne({ where: { [property]: value } });
    console.log('entity', entity);
    // return !entity;
    //En JavaScript y TypeScript, una variable es "verdadera" si no es null, undefined, false, 0, NaN, o una cadena vacía ("").
    if (entity ) {
      throw new UnprocessableEntityException(`${args.property} debe ser único`);
    }

    return true;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

export function IsUnique(
  entityClass: any,
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entityClass, property],
      validator: IsUniqueConstraint,
    });
  };
}

import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource, Not } from 'typeorm';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueUpdateConstraint implements ValidatorConstraintInterface {
  constructor(private dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [EntityClass, propertyName, extractId] = args.constraints;
    const repository = this.dataSource.getRepository(EntityClass);

    // Extract the ID from the object if provided
    const id = extractId ? extractId(args.object) : null;
    console.log("id", id);

    // Prepare the query to check uniqueness, excluding the current entity
    const whereClause: any = { [propertyName]: value };
    if (id) {
      whereClause.id = Not(id);
    }

    // Execute the query
    const entity = await repository.findOne({ where: whereClause });
    if (entity) {
      throw new UnprocessableEntityException(`${args.property} debe ser unico`);
    }
    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} debe ser unico`;
  }
}

export function IsUniqueUpdate(
  EntityClass: any,
  propertyName: string,
  extractId?: (object: any) => any,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [EntityClass, propertyName, extractId],
      validator: IsUniqueUpdateConstraint,
    });
  };
}
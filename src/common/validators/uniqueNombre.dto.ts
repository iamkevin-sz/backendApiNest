// import {
//   registerDecorator,
//   ValidationOptions,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
//   ValidationArguments,
// } from 'class-validator';
// import { DataSource, Not } from 'typeorm';
// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { BranchOffice } from './../../branch_office/entities/branch_office.entity';

// // Definición del Constraint
// @ValidatorConstraint({ name: 'uniqueNombre', async: true })
// @Injectable()
// export class UniqueNombreValidator  implements ValidatorConstraintInterface {
//   constructor(
//     @InjectRepository(BranchOffice)
//     private branchOfficeRepository: Repository<BranchOffice>,
//   ) {}

//     // let branchOffice = await branchOfficeRepository.findOne({ where: { nombre } });
//     // if (!alumno) {
//       // No existe ningún alumno con el mismo nombre
//       // return true;
//     // }
// }

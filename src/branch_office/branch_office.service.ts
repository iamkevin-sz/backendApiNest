import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchOfficeDto } from './dto/create-branch_office.dto';
import { UpdateBranchOfficeDto } from './dto/update-branch_office.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchOffice } from './entities/branch_office.entity';
import { PaginationDto } from 'src/common/validators/pagination.dto';

@Injectable()
export class BranchOfficeService {
  constructor(
    @InjectRepository(BranchOffice)
    private branchOfficeRepository: Repository<BranchOffice>,
  ) {}
  create(createBranchOfficeDto: CreateBranchOfficeDto) {
    return this.branchOfficeRepository.save(createBranchOfficeDto);
  }

  async findAll(paginationDto: PaginationDto ) {
    //si no viene nada en el limit su valor sera 10, si no viene nada en el offset su valor sera 0
    const {limit = 10, offset = 0} = paginationDto;
    return this.branchOfficeRepository.createQueryBuilder().orderBy('id', 'ASC')
    .limit(limit).offset(offset).getMany();
  }

  findOne(id: number) {
    return this.branchOfficeRepository.findOneBy({ id });
  }

  async update(id: number, updateBranchOfficeDto: UpdateBranchOfficeDto): Promise<BranchOffice> {
    await this.branchOfficeRepository.update(id, updateBranchOfficeDto);
    return this.branchOfficeRepository.findOne({ where: { id } });
  }
  

  remove(id: number) {
    return this.branchOfficeRepository.delete(id);
  }
}

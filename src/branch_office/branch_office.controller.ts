import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { BranchOfficeService } from './branch_office.service';
import { CreateBranchOfficeDto } from './dto/create-branch_office.dto';
import { UpdateBranchOfficeDto } from './dto/update-branch_office.dto';
import { BranchOffice } from './entities/branch_office.entity';
import { PaginationDto } from 'src/common/validators/pagination.dto';

@Controller('branch-office')
export class BranchOfficeController {
  constructor(private readonly branchOfficeService: BranchOfficeService) {}

  @Post()
  create(@Body() createBranchOfficeDto: CreateBranchOfficeDto) {
    console.log('branchoffice',{createBranchOfficeDto});
    return this.branchOfficeService.create(createBranchOfficeDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    console.log({paginationDto});
    return this.branchOfficeService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchOfficeService.findOne(+id);
  }

  @Put(':id')
    async update(@Param('id') id: number, @Body() updateBranchOfficeDto: UpdateBranchOfficeDto): Promise<BranchOffice> {
        updateBranchOfficeDto.id = id;
        return this.branchOfficeService.update(id, updateBranchOfficeDto);
    }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchOfficeService.remove(+id);
  }
}

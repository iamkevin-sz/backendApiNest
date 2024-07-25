import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  Put,
  UnprocessableEntityException,
} from '@nestjs/common';

// import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { Product } from './entities/product.entity';
import { SortProductDto } from './dto/sort-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    console.log('Lo que recibo del controlador', createProductDto);
    return this.productsService.create(createProductDto);
  }

  // Nuevo endpoint para validar el nombre del producto
  @Post('validate-name')
  async validateProductName(@Body('name') name: string): Promise<void> {
    
    console.log('Nombre del producto recibido para validación:', name);
    const productExists = await this.productsService.existsByName(name);
    if (productExists) {
      throw new UnprocessableEntityException(
        'El nombre del producto ya existe.',
      );
    }
  }

  @Get()
  findAll(
    @Query() sortProductDto: SortProductDto,
  ): Promise<{ data: Product[]; total: number }> {
    console.log('Lo que recibo del controlador', sortProductDto);
    return this.productsService.findAll(sortProductDto);
  }

  @Get('search')
  async search(
    @Query() searchProductDto: SearchProductDto,
  ): Promise<Product[]> {
    return this.productsService.search(searchProductDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findOne(id);
    return product;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    console.log('updateProductDtooooooooooooooooooooooooooooooooooooooooooooooo', id);
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}

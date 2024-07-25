import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository, In, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { BranchOffice } from 'src/branch_office/entities/branch_office.entity';
import { PriceBranchOfficeProduct } from 'src/price_branch_office_products/entities/price_branch_office_product.entity';
import { SearchProductDto } from './dto/search-product.dto';
import { FindOneProductDto } from './dto/findone-product.dto';
import { validateOrReject } from 'class-validator';
import { ValidationService } from './producto-valid.service';
import { SortProductDto } from './dto/sort-product.dto';

@Injectable()
export class ProductsService {
  findByFieldValue(arg0: { [x: number]: any }) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(BranchOffice)
    private branchOfficeRepository: Repository<BranchOffice>,
    @InjectRepository(PriceBranchOfficeProduct)
    private priceBranchOfficeProductRepository: Repository<PriceBranchOfficeProduct>,
    private validationService: ValidationService,
    private readonly dataSource: DataSource,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);

      for (const priceBranchOfficeProduct of createProductDto.priceBranchOfficeProducts) {
        console.log(
          // 'lo que recibo en productservice for',
          priceBranchOfficeProduct,
        );
        const { price, branch_office_id } = priceBranchOfficeProduct;

        const newPriceBranchOfficeProduct = {
          price: price,
          product: { id: product.id },
          branchOffice: { id: branch_office_id },
        };

        // console.log('el objeto que me llega', newPriceBranchOfficeProduct);
        await this.priceBranchOfficeProductRepository.save(
          newPriceBranchOfficeProduct,
        );
      }

      return product;
    } catch (error) {
      // console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async existsByName(name: string): Promise<boolean> {
    const count = await this.productRepository.count({ where: { name } });
    console.log('count nombre', count);
    return count > 0;
  }

  async findAll(
    sortProductDto?: SortProductDto,
  ): Promise<{ data: Product[]; total: number }> {
    const {
      sortField,
      sortOrder,
      page = 1,
      pageSize = 100,
    } = sortProductDto || {};
    // console.log('datos que recibo', sortField, sortOrder, page, pageSize);

    // Prepare sorting options
    const order = sortOrder ? { [sortField || 'id']: sortOrder } : undefined;

    const take = pageSize;
    const skip = (page - 1) * pageSize;

    // return this.productRepository.find({
    //   relations: {
    //     priceBranchOfficeProducts: {
    //       product: true,
    //       branchOffice: true,
    //     },
    //   },
    //   order, // Apply sorting
    // });

    const [data, total] = await this.productRepository.findAndCount({
      relations: {
        priceBranchOfficeProducts: {
          // product: true,
          branchOffice: true,
        },
      },
      order,
      take,
      skip,
    });

    return { data, total };
  }

  async findOne(id: number) {
    if (isNaN(id)) {
      throw new BadRequestException('ID inválido.');
    }
    await this.validationService.validateId(id);
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        priceBranchOfficeProducts: {
          // product: true,
          branchOffice: true,
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Producto no encontrado.');
    }

    return product;
  }

  async search(searchProductDto: SearchProductDto): Promise<Product[]> {
    const { name, minPrice, maxPrice } = searchProductDto;

    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect(
        'product.priceBranchOfficeProducts',
        'priceBranchOfficeProduct',
      )
      .leftJoinAndSelect('priceBranchOfficeProduct.product', 'relatedProduct')
      .leftJoinAndSelect(
        'priceBranchOfficeProduct.branchOffice',
        'branchOffice',
      );

    if (name) {
      query.andWhere('product.name LIKE :name', { name: `%${name}%` });
    }

    if (minPrice) {
      query.andWhere('priceBranchOfficeProduct.price >= :minPrice', {
        minPrice,
      });
    }

    if (maxPrice) {
      query.andWhere('priceBranchOfficeProduct.price <= :maxPrice', {
        maxPrice,
      });
    }

    return await query.getMany();
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    console.log('updateProductDto', updateProductDto);

    // Encuentra el producto actual con todas las relaciones necesarias
    const product = await this.productRepository.findOne({
        where: { id },
        relations: [
            'priceBranchOfficeProducts',
            'priceBranchOfficeProducts.branchOffice',
        ],
    });

    console.log('Producto encontrado:', product);

    if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Actualiza el nombre del producto si está presente en el DTO
    if (updateProductDto.name) {
        product.name = updateProductDto.name;  // Solo se actualiza el nombre aquí
    }
    // Guardar los cambios en el producto
    await this.productRepository.save(product);

    // Lista para almacenar las promesas de actualización
    const updatePromises = (updateProductDto.priceBranchOfficeProducts || []).map(async updatePbopDto => {
        if (updatePbopDto.id) {
            console.log(`Actualizando priceBranchOfficeProduct con ID que existe ${updatePbopDto.id}`);
            // Asegúrate de que el tipo de precio sea correcto (aquí asumo que price es un número)
            return await this.priceBranchOfficeProductRepository.update(
                { id: updatePbopDto.id },
                { price: updatePbopDto.price }  // Asegúrate de que price sea un número
            );
        } else {
            console.log('id del product', id);
            const newPbop = this.priceBranchOfficeProductRepository.create({
                product: { id: id },
                price: updatePbopDto.price,
                branchOffice: { id: updatePbopDto.branch_office_id }
            });
            console.log('Guardando nuevo priceBranchOfficeProduct con id de producto y sucursal correctos:', newPbop);
            return await this.priceBranchOfficeProductRepository.save(newPbop);
        }
    });

    // Esperar a que todas las promesas se cumplan
    const results = await Promise.all(updatePromises);
    console.log('Todas las actualizaciones se completaron con éxito', results);

    // Eliminar productos según sea necesario
    if (updateProductDto.branchOfficesToDelete && updateProductDto.branchOfficesToDelete.length > 0) {
        console.log('Branch Offices to Delete:', updateProductDto.branchOfficesToDelete);
        // Eliminar relaciones según sea necesario
        await this.priceBranchOfficeProductRepository.delete({
            id: In(updateProductDto.branchOfficesToDelete),
        });

        // Actualiza la instancia del producto para eliminar las sucursales eliminadas
        product.priceBranchOfficeProducts = product.priceBranchOfficeProducts.filter(
            (pbop) => !updateProductDto.branchOfficesToDelete.includes(pbop.id),
        );
    }
    // console.log('Product actualizado que no sirrveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee:', product);
    // Guardar los cambios en el producto
   // await this.productRepository.save(product);
    return product;  // Devuelve el producto actualizado
}


  async remove(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['priceBranchOfficeProducts'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Eliminar las referencias en price_branch_office_product
    for (const priceBranchOfficeProduct of product.priceBranchOfficeProducts) {
      await this.priceBranchOfficeProductRepository.remove(
        priceBranchOfficeProduct,
      );
    }
    await this.productRepository.remove(product);

    return { message: `Product with ID ${id} has been successfully deleted` };
  }
}

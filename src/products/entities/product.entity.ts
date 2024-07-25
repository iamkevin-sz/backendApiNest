import { BranchOffice } from 'src/branch_office/entities/branch_office.entity';
import { PriceBranchOfficeProduct } from 'src/price_branch_office_products/entities/price_branch_office_product.entity';
import { OneToMany,ManyToMany, Entity, Column, PrimaryGeneratedColumn, JoinTable } from 'typeorm';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @OneToMany(() => PriceBranchOfficeProduct, (priceBranchOfficeProduct) => priceBranchOfficeProduct.product, { cascade: true })
  priceBranchOfficeProducts: PriceBranchOfficeProduct[];
}

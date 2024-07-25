import { PriceBranchOfficeProduct } from 'src/price_branch_office_products/entities/price_branch_office_product.entity';
import { Product } from 'src/products/entities/product.entity';
import { OneToMany,ManyToMany, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'branch_office' })
export class BranchOffice {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  location: string;

  

  @OneToMany(() => PriceBranchOfficeProduct, (priceBranchOfficeProduct) => priceBranchOfficeProduct.branchOffice, { cascade: true })
  priceBranchOfficeProducts: PriceBranchOfficeProduct[];

}

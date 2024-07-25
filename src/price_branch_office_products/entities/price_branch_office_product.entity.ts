  import { BranchOffice } from 'src/branch_office/entities/branch_office.entity';
  import { Product } from 'src/products/entities/product.entity';
  import {JoinColumn,ManyToOne,PrimaryColumn, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

  @Entity({ name: 'price_branch_office_product' })
  export class PriceBranchOfficeProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default:0  })
    price: number;
    

    @ManyToOne(() => Product, (product) => product.priceBranchOfficeProducts, { nullable: false })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @ManyToOne(() => BranchOffice, (branchOffice) => branchOffice.priceBranchOfficeProducts, { nullable: false })
    @JoinColumn({ name: 'branch_office_id' })
    branchOffice: BranchOffice;

    // @ManyToOne(() => BranchOffice, (branch_office) => branch_office.priceBranchOfficeProduct)
    // @JoinColumn([{ name: 'branch_office_id', referencedColumnName: 'id' }])
    // branch_office: BranchOffice;

    // @ManyToOne(() => Product, (product) => product.priceBranchOfficeProduct)
    // @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
    // product: Product;
  }

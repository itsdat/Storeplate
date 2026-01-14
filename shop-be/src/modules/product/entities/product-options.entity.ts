import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('product_options')
export class ProductOption {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    label: string; // "M", "XL"

    @Column()
    value: string; // "m", "xl"

    // @CreateDateColumn()
    // createdAt: Date;

    // @UpdateDateColumn()
    // updatedAt: Date;
}

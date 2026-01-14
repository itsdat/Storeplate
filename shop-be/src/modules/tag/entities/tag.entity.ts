import slugify from "slugify";
import { Product } from "src/modules/product/entities/product.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    label: string; // Bedroom

    @Column({ unique: true })
    value: string; // bedroom

    @BeforeInsert()
    @BeforeUpdate()
    generateSlug() {
        if (this.label) {
            this.value = slugify(this.label, {
                lower: true,
                strict: true,
                locale: 'vi'
            });
        }
    }   

    @ManyToMany(() => Product, (product) => product.tags)
    products: Product[];

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}

import slugify from "slugify";
import { Product } from "src/modules/product/entities/product.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("collections")
export class Collection {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    name: string
    
    @Column({unique: true})
    slug: string

    @Column({default: true})
    isActive: boolean;

    @OneToMany(() => Product, (product) => product.collection)
    products: Product[];


    @BeforeInsert()
    @BeforeUpdate()
    generateSlug() {
        if (this.name) {
        this.slug = slugify(this.name, {
            lower: true,
            strict: true,
            locale: 'vi'
        });
        }
    }   

    @Column({ nullable: true })
    image?: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

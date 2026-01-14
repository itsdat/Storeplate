import slugify from "slugify";
import { Tag } from "src/modules/tag/entities/tag.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductVariant } from "./product-variant.entity";
import { ProductOption } from "./product-options.entity";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true})
    name: string;

    @Column({unique: true})
    slug: string

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

    @Column({default: true})
    isActive: boolean;

    @Column({nullable: true})
    rating?: number;

    @Column({nullable: true})
    viewCount?: number;

    @Column({ type: "longtext" })
    description: string;

    @Column({nullable: true, type: "longtext"})
    moreInfo?: string

    @ManyToMany(() => Tag, (tag) => tag.products)
    @JoinTable({
    name: 'product_tags', // ✅ bảng trung gian RIÊNG
    joinColumn: {
        name: 'product_id',
        referencedColumnName: 'id',
    },
    inverseJoinColumn: {
        name: 'tag_id',
        referencedColumnName: 'id',
    },
    })
    tags: Tag[];

    @OneToMany(() => ProductVariant, (variant) => variant.product, { cascade: true, eager: true })
    variants: ProductVariant[];

    @Column({ type: "json" })
    sizes: ProductOption[];

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}

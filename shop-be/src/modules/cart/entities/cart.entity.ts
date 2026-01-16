import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('carts')
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    productId: string;

    @Column()
    userId: string;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column()
    thumbnail: string;

    @Column({ type: "json" })
    size: {
        label: string;
        value: string;
    };

    @Column({ type: "json" })
    sizes: {
        label: string;
        value: string;
    }[];

    @Column()
    price: number;

    @Column()
    discount?: number;

    @Column()
    quantity: number;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}

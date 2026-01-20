import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("vouchers")
export class Voucher {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    code: string;

    @Column()
    discountPercentage: number;

    @Column()
    limit: number;

    @Column({ default: 0 })
    usedCount: number;

    @Column({ default: 0 })
    minOrderTotal: number;

    @Column({ nullable: true })
    maxDiscount?: number;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;
        
    @UpdateDateColumn()
    updatedAt: Date;
}

import { User } from "src/modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("addresses")
export class Address {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: true})
    userId: string;

    @Column()
    city: string;

    @Column()
    district:  string;

    @Column()
    wards:  string;

    @Column()
    street:  string;

    @Column({default: false})
    isDefault: boolean

    @ManyToOne(() => User, user => user.addresses)
    @JoinColumn({ name: 'userId' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}

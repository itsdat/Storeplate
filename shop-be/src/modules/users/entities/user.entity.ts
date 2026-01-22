import { Exclude } from "class-transformer";
import { Address } from "src/modules/address/entities/address.entity";
import { ROLES } from "src/shared/constants/common/role.contanst";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    email: string;

    @Exclude()
    @Column()
    password: string;

    // @Column({unique: true, nullable: true})
    // username: string;

    @Column({nullable: true})
    firstName: string;

    @Column({nullable: true})
    lastName: string;

    @Column({nullable: true})
    fullname?: string;

    @Column({ nullable: true })
    avatar?: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ default: false })
    verified: boolean;

    @Column({default: ROLES.USER})
    role: string;

    @OneToMany(() => Address, address => address.user)
    addresses: Address[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
import slugify from "slugify";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

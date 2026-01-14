import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  key: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  folder: string;

  @CreateDateColumn()
  createdAt: Date;
}

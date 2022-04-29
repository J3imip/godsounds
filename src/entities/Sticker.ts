import {
  BaseEntity, 
  Column, 
  CreateDateColumn, 
  Entity, 
  Index, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn
} from "typeorm";

@Entity({ name: "stickers" })
export class Sticker extends BaseEntity {
  @Index({ unique: true })
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  url: string;

  @Column()
  title: string;

  @Column('text', { array: true })
  tags: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

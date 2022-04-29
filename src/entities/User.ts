import {
  BaseEntity, 
  Column, 
  CreateDateColumn, 
  Entity, 
  Index, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn
} from "typeorm";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @Index({ unique: true })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index({ unique: true })
  @Column()
  userId: number;
  
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  username: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

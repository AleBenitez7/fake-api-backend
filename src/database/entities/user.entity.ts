import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Address } from './address.entity';

@ObjectType({ description: 'product ' })
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  role: string;

  @Field()
  @Column()
  avatar: string;

  @Field()
  @Column()
  lastname: string;  // Nuevo campo

  @Field()
  @Column()
  cellphone: string; // Nuevo campo

  @Field()
  @Column()
  ci: string; // Nuevo campo

  @OneToMany(() => Address, address => address.user)
  addresses: Address[];

  @Field()
  @CreateDateColumn({
    name: 'creation_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creationAt: Date;

  @Field()
  @UpdateDateColumn({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}

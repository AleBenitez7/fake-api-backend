// src/entities/address.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
@Entity('addresses')
export class Address {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Field()
    @Column()
    country: string;

    @Field()
    @Column()
    city: string;

    @Field()
    @Column()
    address: string;

    @Field()
    @Column()
    phone: string;

    @Field()
    @Column()
    description: string;

    @ManyToOne(() => User, user => user.addresses)
    user: User;
}

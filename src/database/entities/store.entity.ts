import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Product } from '@db/entities/product.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType({ description: 'store' })
export class Store {
    @Field(() => ID)
    @Column({ primary: true, type: 'text' }) 
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column({ nullable: true })
    shop: string;

    @OneToMany(() => Product, (product) => product.store)
    products: Product[];


    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}
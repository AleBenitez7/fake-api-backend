import { IsString, IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateStoreDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Field()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Field()
    shop: string;
}

@InputType()
export class UpdateStoreDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Field({ nullable: true })
    name?: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Field({ nullable: true })
    shop?: string;
}
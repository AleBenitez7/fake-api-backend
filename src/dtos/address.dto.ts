import { IsString, IsOptional, IsPhoneNumber, IsNotEmpty, IsNumberString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAddressDto {
    @ApiProperty()
    @IsString()
    @Field()
    country: string;

    @ApiProperty()
    @IsString()
    @Field()
    department: string;

    @ApiProperty()
    @IsString()
    @Field()
    city: string;

    @ApiProperty()
    @IsString()
    @Field()
    address: string;

    @ApiProperty()
    @IsString(null)
    @IsOptional()
    phone?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    description?: string;


    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    userId: number;
}

@InputType()
export class UpdateAddressDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    country?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    department?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    city?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    address?: string;

    @ApiProperty()
    @IsPhoneNumber()
    @IsOptional()
    @Field({ nullable: true })
    phone?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    description?: string;
}

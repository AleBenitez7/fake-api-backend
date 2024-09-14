import {
  IsString,
  IsNotEmpty,
  IsAlphanumeric,
  IsEmail,
  IsOptional,
  IsUrl,
  IsNumber,
  IsEnum,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType, ArgsType } from '@nestjs/graphql';
import { Role } from 'src/models/roles';

@InputType()
export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @ApiProperty()
  @IsAlphanumeric()
  @IsNotEmpty()
  @MinLength(4)
  @Field()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Role)
  @Field(() => Role, { nullable: true })
  role: Role;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  @Field()
  avatar: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Field()
  lastname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Field()
  cellphone: string; // Nuevo campo

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Field()
  ci: string; // Nuevo campo
}

@InputType()
export class UpdateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name: string;

  @ApiProperty()
  @IsAlphanumeric()
  @MinLength(4)
  @IsOptional()
  @Field({ nullable: true })
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Role)
  @Field(() => Role, { nullable: true })
  role: Role;

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  @Field({ nullable: true })
  avatar: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  lastname: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  cellphone: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  ci: string;
}

@ArgsType()
export class ValidateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;
}

@ArgsType()
export class FilterUsersDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Field({ nullable: true })
  limit?: number;
}

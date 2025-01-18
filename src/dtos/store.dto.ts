import { IsString, IsArray, IsObject } from 'class-validator';

export class StoreDTO {
    @IsString()
    name: string;

    @IsString()
    shop: string;

    @IsString()
    building: string;

    @IsObject()
    geometry: { type: string; coordinates: number[][][] };

    @IsString()
    osmId: string;
}

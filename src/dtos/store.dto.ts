import { IsString, IsObject } from 'class-validator';

export class StoreDTO {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    shop: string;

    @IsString()
    building: string;

    @IsObject()
    geometry: { type: string; coordinates: number[][][] };

    @IsString()
    type: string;

    @IsString()
    osmId: string;
}

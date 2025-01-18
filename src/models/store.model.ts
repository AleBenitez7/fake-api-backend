export class Store {
    id: number;
    name: string;
    shop: string;
    building: string;
    geometry: { type: string; coordinates: number[][][] };
    osmId: string;
}

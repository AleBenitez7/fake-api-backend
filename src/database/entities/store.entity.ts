import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Store {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    shop: string;

    @Column()
    building: string;

    @Column('jsonb')
    geometry: { type: string; coordinates: number[][][] };

    @Column()
    osmId: string;

    @Column()
    type: string;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Store {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    category: string;

    @Column()
    building: string;

    @Column('jsonb')
    geometry: any;  // Si 'geometry' es un objeto complejo, usa 'jsonb' o 'json' para almacenarlo.
}

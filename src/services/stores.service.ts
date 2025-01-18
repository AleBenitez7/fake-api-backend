import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreDTO } from '@dtos/store.dto';
import { Store } from '@db/entities/store.entity';


@Injectable()
export class StoreService {
    constructor(
        @InjectRepository(Store)
        private storeRepository: Repository<Store>
    ) { }

    async create(storeDto: StoreDTO): Promise<Store> {
        const store = this.storeRepository.create(storeDto);
        return this.storeRepository.save(store);
    }

    async findAll(): Promise<Store[]> {
        return this.storeRepository.find();
    }

    async findById(id: number): Promise<Store> {
        return this.storeRepository.findOne({ where: { id } });
    }
}

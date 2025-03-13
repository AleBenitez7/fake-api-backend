import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '@db/entities/store.entity';
import { CreateStoreDto, UpdateStoreDto } from '@dtos/store.dto';

@Injectable()
export class StoresService {
    constructor(
        @InjectRepository(Store)
        private storeRepository: Repository<Store>,
    ) { }


    findAll() {
        return this.storeRepository.find({ relations: ['products'] });
    }

    findOne(id: number) {
        return this.storeRepository.findOne({ where: { id }, relations: ['products'] });
    }

    create(data: CreateStoreDto) {
        const newStore = this.storeRepository.create(data);
        return this.storeRepository.save(newStore);
    }

    async update(id: number, changes: UpdateStoreDto) {
        await this.storeRepository.update(id, changes);
        return this.findOne(id);
    }

    async delete(id: number) {
        await this.storeRepository.delete(id);
        return true;
    }
}
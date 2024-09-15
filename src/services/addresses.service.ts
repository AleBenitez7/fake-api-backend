import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto, UpdateAddressDto } from '../dtos/address.dto';
import { Address } from '../database/entities/address.entity';

@Injectable()
export class AddressesService {

    constructor(
        @InjectRepository(Address)
        private addressesRepository: Repository<Address>,
    ) { }

    async create(dto: CreateAddressDto): Promise<Address> {
        const address = this.addressesRepository.create(dto);
        return this.addressesRepository.save(address);
    }

    async findById(id: number): Promise<Address> {
        return this.addressesRepository.findOneBy({ id });
    }

    async getAllByUser(userId: number): Promise<Address[]> {
        return this.addressesRepository.find({ where: { userId } });
    }

    async update(id: number, changes: UpdateAddressDto): Promise<Address> {
        await this.addressesRepository.update(id, changes);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.addressesRepository.delete(id);
    }
}

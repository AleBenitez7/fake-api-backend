import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StoreDTO } from '@dtos/store.dto';
import { StoreService } from '@services/stores.service';
import { Store } from '@db/entities/store.entity';

@ApiTags('stores')
@Controller('stores')
export class StoreController {
    constructor(private storeService: StoreService) { }

    @Post()
    async createStore(@Body() storeDto: StoreDTO): Promise<Store> {
        return this.storeService.create(storeDto);
    }

    @Get()
    async getStores(): Promise<Store[]> {
        return this.storeService.findAll();
    }

    @Get(':id')
    async getStore(@Param('id') id: string): Promise<Store> {
        return this.storeService.findById(id);
    }
}

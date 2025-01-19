import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StoreDTO } from '@dtos/store.dto';
import { Store } from '@db/entities/store.entity';
import { StoreService } from '@services/stores.service';

@Resolver(() => Store)
export class StoreResolver {
    constructor(private storeService: StoreService) { }

    @Mutation(() => Store)
    async createStore(@Args('storeDto') storeDto: StoreDTO): Promise<Store> {
        return this.storeService.create(storeDto);
    }

    @Query(() => [Store])
    async getStores(): Promise<Store[]> {
        return this.storeService.findAll();
    }

    @Query(() => Store)
    async getStore(@Args('id') id: string): Promise<Store> {
        return this.storeService.findById(id);
    }
}

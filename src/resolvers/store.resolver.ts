import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { Store } from '@db/entities/store.entity';
import { StoresService } from '@services/stores.service';
import { CreateStoreDto, UpdateStoreDto } from '@dtos/store.dto';

@Resolver(() => Store)
export class StoresResolver {
    constructor(private storesService: StoresService) { }

    @Query(() => [Store])
    stores() {
        return this.storesService.findAll();
    }

    @Query(() => Store)
    store(@Args('id', { type: () => ID }) id: number) {
        return this.storesService.findOne(id);
    }

    @Mutation(() => Store)
    addStore(@Args('data') dto: CreateStoreDto) {
        return this.storesService.create(dto);
    }

    @Mutation(() => Store)
    updateStore(
        @Args('id', { type: () => ID }) id: number,
        @Args('changes') changes: UpdateStoreDto,
    ) {
        return this.storesService.update(id, changes);
    }

    @Mutation(() => Boolean)
    deleteStore(@Args('id', { type: () => ID }) id: number) {
        return this.storesService.delete(id);
    }
}

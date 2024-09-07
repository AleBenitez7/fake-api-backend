import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { AddressesService } from '@services/addresses.service';
import { Address } from '@db/entities/address.entity';
import { CreateAddressDto, UpdateAddressDto } from '@dtos/address.dto';

@Resolver(() => Address)
export class AddressesResolver {
    constructor(private addressesService: AddressesService) { }

    @Query(() => [Address])
    getAddresses(@Args('userId', { type: () => ID }) userId: number) {
        return this.addressesService.getAllByUser(userId);
    }

    @Mutation(() => Address)
    addAddress(@Args('data') dto: CreateAddressDto) {
        return this.addressesService.create(dto);
    }

    @Mutation(() => Address)
    updateAddress(
        @Args('id', { type: () => ID }) id: number,
        @Args('changes') changes: UpdateAddressDto,
    ) {
        return this.addressesService.update(id, changes);
    }

    @Mutation(() => Boolean)
    deleteAddress(@Args('id', { type: () => ID }) id: number) {
        return this.addressesService.delete(id);
    }
}

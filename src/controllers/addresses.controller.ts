import { Controller, Get, Post, Body, Param, Put, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { AddressesService } from '../services/addresses.service';
import { CreateAddressDto, UpdateAddressDto } from '../dtos/address.dto';
import { Address } from '@db/entities/address.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('addresses')
@Controller('addresses')
export class AddressesController {
    constructor(private addressesService: AddressesService) { }

    @Post()
    create(@Body() dto: CreateAddressDto) {
        return this.addressesService.create(dto);
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.addressesService.findById(id);
    }

    @Get()
    getAllByUser(@Query('userId', ParseIntPipe) userId: number) {
        return this.addressesService.getAllByUser(userId);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() changes: UpdateAddressDto) {
        return this.addressesService.update(id, changes);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.addressesService.delete(id);
    }
}

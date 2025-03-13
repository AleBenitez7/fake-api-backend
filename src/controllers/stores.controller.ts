import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StoresService } from '@services/stores.service';
import { CreateStoreDto, UpdateStoreDto } from '@dtos/store.dto';

@ApiTags('stores')
@Controller('stores')
export class StoresController {
    constructor(private storesService: StoresService) { }

    @Get()
    getAll() {
        return this.storesService.findAll();
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.storesService.findOne(id);
    }

    @Post()
    create(@Body() store: CreateStoreDto) {
        return this.storesService.create(store);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() changes: UpdateStoreDto,
    ) {
        return this.storesService.update(id, changes);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.storesService.delete(id);
    }
}

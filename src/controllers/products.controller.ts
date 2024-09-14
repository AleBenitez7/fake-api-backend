import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiExcludeEndpoint } from '@nestjs/swagger';
import { FilterProductsDto, CreateProductDto, UpdateProductDto } from 'src/dtos/product.dto';
import { ProductsService } from 'src/services/products.service';


@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAll(@Query() params: FilterProductsDto) {
    return this.productsService.getAll(params);
  }

  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findById(id);
  }

  @Post()
  create(@Body() product: CreateProductDto) {
    return this.productsService.create(product);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: UpdateProductDto,
  ) {
    return this.productsService.update(id, changes);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }

  @ApiExcludeEndpoint()
  @Post('/raw')
  getRaw() {
    return this.productsService.getRaw();
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  Post,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilterCategoriesDto, CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/category.dto';
import { FilterProductsDto } from 'src/dtos/product.dto';
import { CategoriesService } from 'src/services/categories.service';
import { ProductsService } from 'src/services/products.service';


@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
  ) {}

  @Get()
  getAll(@Query() params: FilterCategoriesDto) {
    return this.categoriesService.getAll(params);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findById(id);
  }

  @Post()
  create(@Body() category: CreateCategoryDto) {
    return this.categoriesService.create(category);
  }

  @Get(':id/products')
  getProductsByCategory(
    @Param('id', ParseIntPipe) id: number,
    @Query() params: FilterProductsDto,
  ) {
    return this.productsService.byCategory(id, params);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, changes);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.delete(id);
  }
}

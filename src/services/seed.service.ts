import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { Category } from '@db/entities/category.entity';
import { Product } from '@db/entities/product.entity';
import { User } from '@db/entities/user.entity';
import { Role } from '@models/roles';
import * as fs from 'fs';
import { Address } from '@db/entities/address.entity';
import { Store } from '@db/entities/store.entity';

@Injectable()
export class SeedService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async init() {
    await this.dataSource.synchronize(true);

    // -------- REPOS --------

    const usersRepo = this.dataSource.getRepository(User);
    const categoriesRepo = this.dataSource.getRepository(Category);
    const productsRepo = this.dataSource.getRepository(Product);
    const addressesRepo = this.dataSource.getRepository(Address);
    const storesRepo = this.dataSource.getRepository(Store); 

    // -------- USERS --------

    await usersRepo.save([
      {
        id: 1,
        email: 'john@mail.com',
        password: 'changeme',
        name: 'Jhon',
        role: Role.customer,
        avatar: 'https://i.imgur.com/LDOO4Qs.jpg',
        lastname: 'Cramer',
        cellphone: '0994980625',
        ci: '4967890',
      },
      {
        id: 2,
        email: 'maria@mail.com',
        password: 'Alej$2023',
        name: 'Maria',
        role: Role.customer,
        avatar: 'https://i.imgur.com/DTfowdu.jpg',
        lastname: 'Lopez',
        cellphone: '0994980625',
        ci: '4967891',
      },
      {
        id: 3,
        email: 'admin@mail.com',
        password: 'admin123',
        name: 'Admin',
        role: Role.admin,
        avatar: 'https://i.imgur.com/yhW6Yw1.jpg',
        lastname: 'admin',
        cellphone: '0994980425',
        ci: '4967890',
      },
    ]);
    const users = await usersRepo.find();

    // -------- CATEGORIES --------
    const categoriesData = this.loadCategoriesJson();
    const categoriesRta = await categoriesRepo.save(categoriesData);

    // -------- Products --------

    const productsData = this.loadProductsJson().map((product) => {
      const categoryEntity = categoriesRta.find(
        (item) => item.id === parseInt(product.category_id, 10),
      );

      return {
        title: product.title,
        price: parseInt(product.price, 10),
        description: product.description,
        images: product.images,
        category: categoryEntity,
        locationId: String(product.locationId), 
      };
    });

    await productsRepo.save(productsData);

    // -------- ADDRESSES --------
    const addressesData = this.loadAddressesJson().map((address) => {
      const userEntity = users.find(user => user.id === address.userId);

      return {
        country: address.country,
        department: address.department,
        city: address.city,
        address: address.address,
        phone: address.phone,
        description: address.description,
        user: userEntity,
      };
    });

    await addressesRepo.save(addressesData);

    // -------- STORES --------
    const storesData = this.loadStoresJson().map((store) => {
      return {
        name: store.properties.name,  // Verifica que la propiedad 'name' está correctamente extraída
        category: store.properties.shop,  // Propiedad 'shop' para la categoría
        building: store.properties.building,  // 'building' si es necesario
        geometry: store.geometry,  // Asegúrate de que 'geometry' se almacene en el formato correcto
      };
    });

    // Guarda los datos de las tiendas
    await storesRepo.save(storesData);

    // -------- COUNTERS --------

    //const users = await usersRepo.find();
    const categories = await categoriesRepo.find();
    const products = await productsRepo.find();
    const addresses = await addressesRepo.find();

    return {
      users: users.length,
      categories: categories.length,
      products: products.length,
      addresses: addresses.length,
    };
  }

  loadProductsJson(): any[] {
    const products = JSON.parse(
      fs.readFileSync('src/dataset/products.json', 'utf8'),
    );
    return products;
  }

  loadCategoriesJson(): Category[] {
    const categories = JSON.parse(
      fs.readFileSync('src/dataset/categories.json', 'utf8'),
    );
    return categories;
  }

  loadAddressesJson(): any[] {
    const addresses = JSON.parse(
      fs.readFileSync('src/dataset/addresses.json', 'utf8'),
    );
    return addresses;
  }

  loadStoresJson(): any[] {
    const stores = JSON.parse(
      fs.readFileSync('src/dataset/tiendas.json', 'utf8'),
    );
    return stores;
  }
}

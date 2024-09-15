import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigType } from '@nestjs/config';

import { SeedController } from './controllers/seed.controller';
import { ProductsController } from './controllers/products.controller';
import { UsersController } from './controllers/users.controller';
import { AuthController } from './controllers/auth.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { SeedService } from './services/seed.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ProductsResolver } from './resolvers/products.resolver';
import { CategoriesResolver } from './resolvers/categories.resolver';
import { UsersResolver } from './resolvers/users.resolver';
import { AuthResolver } from './resolvers/auth.resolver';


import config from './config/config';
import environments from './config/environments';
import { AddressesResolver } from './resolvers/addresses.resolver';
import { DatabaseModule } from './database/database.module';
import { AddressesController } from './controllers/addresses.controller';
import { AddressesService } from './services/addresses.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env.local',
      load: [config],
      isGlobal: true,
    }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.accessSecretKey,
        };
      },
      inject: [config.KEY],
    }),
    MulterModule.register({
      dest: './upload',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      introspection: true,
      autoSchemaFile: './schema.gql'
    }),
    DatabaseModule,
  ],
  controllers: [
    SeedController,
    ProductsController,
    UsersController,
    AuthController,
    CategoriesController,
    AddressesController
  ],
  providers: [
    SeedService,
    ProductsService,
    CategoriesService,
    AuthService,
    UsersService,
    LocalStrategy,
    JwtStrategy,
    ProductsResolver,
    UsersResolver,
    CategoriesResolver,
    AuthResolver,
    AddressesResolver,
    AddressesService
  ],
})
export class AppModule {}

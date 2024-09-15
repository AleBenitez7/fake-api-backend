import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { User } from '../database/entities/user.entity';
import { CurrentUserGql } from '../decorators/current-user-gql.decorator';
import { JwtAuthGqlGuard } from '../guards/jwt-auth-gql.guard';
import { LocalAuthGqlGuard } from '../guards/local-auth-gql.guard';
import { Login } from '../models/login.model';
import { Payload } from '../models/payload.model';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';


@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Mutation(() => Login)
  @UseGuards(LocalAuthGqlGuard)
  login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
    @CurrentUserGql() user: User,
  ) {
    return {
      access_token: this.authService.generateAccessToken(user),
      refresh_token: this.authService.generateRefreshToken(user),
    };
  }

  @UseGuards(JwtAuthGqlGuard)
  @Query(() => User)
  myProfile(@CurrentUserGql() user: Payload) {
    return this.usersService.findById(user?.userId);
  }

  @Mutation(() => Login)
  refreshToken(
    @Args('refreshToken', { type: () => String }) refreshToken: string,
  ) {
    return this.authService.generateAccessTokenByRefreshToken(refreshToken);
  }
}

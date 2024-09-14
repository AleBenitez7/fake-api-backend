import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';


import { UsersService } from './users.service';
import config from 'src/config/config';
import { User } from 'src/database/entities/user.entity';
import { Payload } from 'src/models/payload.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  generateAccessToken(user: User) {
    const payload: Payload = { sub: user.id };
    return this.jwtService.sign(payload, {
      expiresIn: '20d',
      secret: this.configService.accessSecretKey,
    });
  }

  generateRefreshToken(user: User) {
    const payload: Payload = { sub: user.id };
    return this.jwtService.sign(payload, {
      expiresIn: '10h',
      secret: this.configService.refreshSecretKey,
    });
  }

  generateJWT(user: User) {
    const payload: Payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async generateAccessTokenByRefreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.refreshSecretKey,
      });
      const user = await this.usersService.findById(payload.sub);
      const newAccessToken = this.generateAccessToken(user);
      const newRefreshToken = this.generateRefreshToken(user);
      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid');
    }
  }
}

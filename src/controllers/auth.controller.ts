import { Controller, Post, UseGuards, Req, Get, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from 'src/database/entities/user.entity';
import { RefreshTokenDto } from 'src/dtos/auth.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Payload } from 'src/models/payload.model';
import { AuthService } from 'src/services/auth.service';
import { UsersService } from 'src/services/users.service';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as User;
    return {
      access_token: this.authService.generateAccessToken(user),
      refresh_token: this.authService.generateRefreshToken(user),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Req() req: Request) {
    const user = req.user as Payload;
    return this.usersService.findById(user?.userId);
  }

  @Post('refresh-token')
  refreshToken(@Body() dto: RefreshTokenDto) {
    return this.authService.generateAccessTokenByRefreshToken(dto.refreshToken);
  }
}

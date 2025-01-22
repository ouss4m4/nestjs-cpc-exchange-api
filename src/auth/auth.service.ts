/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from './types';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   *
   * @param User
   * @returns LoginResponse -
   */
  login(user: User): { jwt: string } {
    const role =
      user.email == 'john@gmail.com'
        ? 'Admin'
        : user.client.type == 1
          ? 'Publisher'
          : 'Advertiser';
    const payload: JwtPayload = {
      name: user.name,
      clientId: user.clientId,
      sub: user.id,
      role,
    };
    return {
      jwt: this.jwtService.sign(payload),
    };
  }
}

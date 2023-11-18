import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../core/services/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne({
      where: {
        username,
        password,
      },
    });

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

import { Injectable } from '@nestjs/common';
import { UserService } from '../core/services/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(username: string, password: string) {
    const user = await this.userService.findOne({
      where: {
        username,
        password,
      },
    });
  }
}

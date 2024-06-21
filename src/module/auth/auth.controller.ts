import { Controller, Req } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Request } from 'express';
import { Data } from 'src/common/decorators/data.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @MessagePattern({ role: 'sayHello', cmd: 'say-hello' })
  async sayHello(@Data() data: any) {
    return data;
  }

  @MessagePattern({ role: 'AdminLogin', cmd: 'admin-login' })
  async admin_login(@Data() data: any) {
      return await this.authservice.adminLogin(data);
  }
}

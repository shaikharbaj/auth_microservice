import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { Data } from 'src/common/decorators/data.decorator';
import { AuthService } from './auth.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { ID } from 'src/common/decorators/id.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) { }

  @MessagePattern({ role: 'sayHello', cmd: 'say-hello' })
  async sayHello(@Data() data: any) {
    throw new RpcException(data)
    return data;
  }

  @MessagePattern({ role: 'AdminLogin', cmd: 'admin-login' })
  async admin_login(@Data() data: any, @Auth() auth: any, @ID() id: number) {
    console.log(auth);
    console.log(id);
    return await this.authservice.adminLogin(data);
  }
}

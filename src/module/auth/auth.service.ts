import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MICROSERVICE') private readonly userClient: ClientProxy,
  ) {}

  public async hashPassword(password: string) {
    const token = await bcrypt.hash(password, 10);
    return token;
  }
  async adminLogin(payload: any) {
    try {
      const checkuserExist = lastValueFrom(
        this.userClient.send(
          { role: 'CHECK-USER_EXIST', cmd: 'check-user-exist' },
          { data: payload },
        ),
      );

      //hash password and save user.........
      //  const hashedPassword = await this.hashPassword()
      return checkuserExist;
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }

  async adminRegister(payload: any) {
    try {
      //check admin_is already present or not.........
      const checkisAdminPresent = await lastValueFrom(
        this.userClient.send(
          { role: 'CHECK-USER_EXIST', cmd: 'check-user-exist' },
          { data: { email: payload.email, role: 'admin' } },
        ),
      );

      console.log(payload);

      if (checkisAdminPresent) {
        throw new RpcException('user with this email is already exist.');
      }

      //hashed password...............
      const hashedPassword = await this.hashPassword(payload.password);
      //save user in database.......
      const newUser = await lastValueFrom(
        this.userClient.send(
          { role: 'CREATE-ADMIN', cmd: 'create-admin' },
          { data:{...payload, hashpassword: hashedPassword }},
        ),
      );

      return newUser;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}

import { Inject, Injectable} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(@Inject("USER_MICROSERVICE") private readonly userClient:ClientProxy){}
    async adminLogin(payload:any){
          try {
            const checkuserExist = lastValueFrom(this.userClient.send({role:"CHECK-USER_EXIST",cmd:"check-user-exist"},{data:payload}));

           return checkuserExist;
          } catch (error) {
            console.log(error);
            throw new RpcException(error);
          }
    }

    async adminRegister(payload:any){
            try {
               //check admin_is already present or not.........
               const checkisAdminPresent = await lastValueFrom(this.userClient.send({role:"CHECK-USER_EXIST",cmd:"check-user-exist"},{data:{email:payload.email,role:'admin'}}))

              if(!checkisAdminPresent){
                   throw new RpcException('user with this email is already exist.');
              }
            } catch (error) {
                 throw new RpcException(error);
            }
    }
}

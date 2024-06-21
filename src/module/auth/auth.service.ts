import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {

    constructor(@Inject("USER_MICROSERVICE") private readonly userClient:ClientProxy){}
    async adminLogin(payload:any){
        //   const checkuserExist = await this.userClient.send({role:""})
    }
}

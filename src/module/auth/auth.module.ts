import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 8002,
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

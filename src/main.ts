import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger('Microservice');
async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(8001);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 8001,
      },
    },
  );
  await app.listen();
  logger.log('Auth microservice is listening at port ' + 8001);
}
bootstrap();

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MathController } from './math.controller';
import { MATH_SERVICE } from './math.constant';

@Module({
  imports: [
    ClientsModule.register([{ name: MATH_SERVICE, transport: Transport.TCP }]),
  ],
  controllers: [MathController],
})
export class MathModule {}

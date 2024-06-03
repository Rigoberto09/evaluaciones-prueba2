import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';

@Module({
  providers: [ClienteService]
})
export class ClienteModule {}

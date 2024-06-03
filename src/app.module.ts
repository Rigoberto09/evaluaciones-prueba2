import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { DireccionesModule } from './direcciones/direcciones.module';

@Module({
  imports: [ClienteModule, DireccionesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { DireccionesModule } from './direcciones/direcciones.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './dataconfig/dataconfig';

@Module({
  imports: [ClienteModule, DireccionesModule,TypeOrmModule.forRoot(databaseConfig)],//configuracion de base de datos
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

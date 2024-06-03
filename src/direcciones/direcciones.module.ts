import { Module } from '@nestjs/common';
import { DireccionesService } from './direcciones.service';

@Module({
  providers: [DireccionesService]
})
export class DireccionesModule {}

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cliente } from 'src/cliente/cliente.entity/cliente.entity';
import { Direccion } from 'src/direcciones/direcciones.entity/direccion.entity';
export const databaseConfig: TypeOrmModuleOptions = {
    name: 'default',
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'productos',
    synchronize: true,
    logging: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // entities: [__dirname + '/../**/*.entity{.ts,.js}'],// entities: [__dirname + '/**/*.entity{.ts,.js}'],esto varia
    entities: [Cliente, Direccion],
}
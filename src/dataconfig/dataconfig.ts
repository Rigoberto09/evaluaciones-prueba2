import { TypeOrmModuleOptions } from '@nestjs/typeorm';
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
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],// entities: [__dirname + '/**/*.entity{.ts,.js}'],esto varia
}
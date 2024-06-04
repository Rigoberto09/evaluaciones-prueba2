import { Direccion } from "src/direcciones/direcciones.entity/direccion.entity";
import { Column, Entity, ObjectIdColumn, OneToMany } from "typeorm";
@Entity()
export class Cliente {
    @ObjectIdColumn()
    _id: string;

    @Column({ type: 'bigint' })
    customerCode: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    adrres: string;

    @Column({ type: 'bigint' })
    phone: number;

    @Column()
    @OneToMany(() => Direccion, direccion => direccion.cliente, { cascade: true })
    direcciones: Direccion[];
}
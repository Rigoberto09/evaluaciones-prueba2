import { Direccion } from "src/direcciones/direcciones.entity/direccion.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cliente{
    @PrimaryGeneratedColumn()
    customerCode:number;

    @Column()
    name:string;
    @Column()
    adrres:string;
    @Column()
    phone:number;

    @OneToMany(()=>Direccion, direccion=> direccion.cliente)
    direcciones:Direccion[];
    
}
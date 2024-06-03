import { Cliente } from "src/cliente/cliente.entity/cliente.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Direccion{
    @PrimaryGeneratedColumn()
    addresCode:number;
    @Column()
    calle:string;
    @Column()
    ciudad:string
    @ManyToMany(()=>Cliente, cliente=>cliente.direcciones)
    cliente:Cliente;
}
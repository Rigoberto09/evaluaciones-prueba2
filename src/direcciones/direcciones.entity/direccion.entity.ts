import { Cliente } from "src/cliente/cliente.entity/cliente.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Direccion{
    @PrimaryGeneratedColumn()
    addresCode:number;
    @Column()
    calle:string;
    @Column()
    ciudad:string
    @ManyToOne(()=>Cliente, cliente=>cliente.direcciones)
    cliente:Cliente;
}
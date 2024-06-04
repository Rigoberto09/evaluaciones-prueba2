import { Cliente } from "src/cliente/cliente.entity/cliente.entity";

export interface DireccionesInterface {
    addresCode:number;
    
    calle:string;
    
    ciudad:string
    
    cliente:Cliente;
}

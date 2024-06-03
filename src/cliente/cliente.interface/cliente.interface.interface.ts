import { Direccion } from "src/direcciones/direcciones.entity/direccion.entity";

export interface ClienteInterface {
    customerCode: number;

    name: string;

    adrres: string;

    phone: number;

    direcciones: Direccion[];

}
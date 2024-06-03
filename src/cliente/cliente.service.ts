import { Injectable, InternalServerErrorException, NotAcceptableException } from '@nestjs/common';
import { Cliente } from './cliente.entity/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteInterface } from './cliente.interface/cliente.interface.interface';

@Injectable()
export class ClienteService {
    constructor(@InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>) { }

    //control de datos vacios Clientes
    async verificacionDatosEnvio(identify: number, id: string, DatosCliente: ClienteInterface) {
        let DatosFaltantes = '';
    
        if (!DatosCliente.name || DatosCliente.name.trim() === '') {
          DatosFaltantes += 'Nombre completo';
        }
    
        if (!DatosCliente.direcciones || DatosCliente.direcciones.toString().trim() === '') {
          DatosFaltantes += DatosFaltantes ? ', Dirección' : 'Dirección';
        }
    
        if (!DatosCliente.phone || DatosCliente.phone.toString().trim() === '') {
          DatosFaltantes += DatosFaltantes ? ', Teléfono' : 'Teléfono';
        }
    
        if (DatosFaltantes === '') {
          if (identify === 0) {
            return this.crearCliente(DatosCliente);
          } else if (identify === 1) {
            // return this.actualizarCliente(id, DatosCliente);
          } else if (identify === 2) {
            // return this.eliminarCliente(id);
          }
        } else {
          throw new NotAcceptableException('Faltan datos: ' + DatosFaltantes);
        }
      }
    async crearCliente(NuevoCliente:ClienteInterface):Promise<ClienteInterface>{
        try {
            const cliente = this.clienteRepository.save(NuevoCliente);
            return cliente;
            
        } catch (error) {
            // console.log('erro al crear cliente '+ error);
            throw new InternalServerErrorException('Error al crear cliente');
        }
    }

    async getCliente(): Promise<Cliente[]> {
        try {
            const cliente = await this.clienteRepository.find()
            if (cliente.length == 0) {
                throw new NotAcceptableException('No se encontraron datos en el registro');
    
            }
            return cliente;
            
        } catch (error) {
            // console.log('no se puede mostrar los clientes' + error)
            throw new NotAcceptableException('No se encontraron datos en el registro');
    
        }
    }
    

}

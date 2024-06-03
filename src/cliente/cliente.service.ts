import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Cliente } from './cliente.entity/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService {
    constructor(@InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>){}
    async getCliente(): Promise<Cliente[]>{
        const cliente =await this.clienteRepository.find()
        if(cliente.length==0){
            throw new NotAcceptableException('No se encontraron datos en el registro');

        }else{
            return cliente;
        }
        

    }
}

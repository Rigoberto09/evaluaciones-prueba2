import { Controller, Get } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity/cliente.entity';

@Controller('cliente')
export class ClienteController {
    constructor(
        private readonly clienteService:ClienteService
    ){}
    
    @Get()
    getClientes():Promise<Cliente[]>{
        return this.clienteService.getCliente()
    }
    
}

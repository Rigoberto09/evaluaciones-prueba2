import { Body, Controller, Delete, Get, OnModuleInit, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity/cliente.entity';
import { ClienteInterface } from './cliente.interface/cliente.interface.interface';

@Controller('cliente')
export class ClienteController implements OnModuleInit{
    constructor(
        private readonly clienteService:ClienteService
    ){}
    // variables global
    idGenerada=0;
    async onModuleInit() {
        this.idGenerada = await this.clienteService.contadorGetClientes();
        // console.log(this.idGenerada);
    }
    async IdGeneredo(){
        this.idGenerada = await this.clienteService.contadorGetClientes();
    }

    @Get()
    getClientes():Promise<Cliente[]>{
        this.IdGeneredo();
        return this.clienteService.getCliente()
    }
    
    // @Post()
    // async crearNuevoCliente(@Body() data: ClienteInterface) {
    //     const customerCode = await this.clienteService.contadorGetClientes();
    //     data.customerCode = Number(customerCode);
    //     console.log('controller', data);

    //     return this.clienteService.crearCliente(data);
    // }
    @Post()
    async crearNuevoCliente(@Body() data: Omit<ClienteInterface, 'customerCode'>) {
        const customerCode = await this.clienteService.contadorGetClientes();
        const nuevoCliente: ClienteInterface = { customerCode, ...data };
        // console.log('controller', nuevoCliente);
        return this.clienteService.crearCliente(nuevoCliente);
    }
    @Put(':customerCode')
    async actualizarCliente(
        @Param('customerCode', ParseIntPipe) customerCode: number,
        @Body() updateData: Partial<ClienteInterface>
    ) {
        return this.clienteService.updateCliente(customerCode, updateData);
    }

    @Delete(':customerCode')
    async eliminarCliente(@Param('customerCode', ParseIntPipe) customerCode: number) {
        return this.clienteService.deleteCliente(customerCode);
    }

}

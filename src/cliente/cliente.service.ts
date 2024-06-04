import { Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Cliente } from './cliente.entity/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteInterface } from './cliente.interface/cliente.interface.interface';

@Injectable()
export class ClienteService
    implements OnModuleInit {
    constructor(@InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>) { }

    //variables goblanes
    idGenerado: number;
    //funciones que se requieren al iniciar el sistema
    onModuleInit() {
        this.contadorGetClientes();
    }

    async contadorGetClientes(): Promise<number> {
        const ultimoCliente = await this.clienteRepository.findOne({
            order: {
                customerCode: 'DESC',
            },
        });

        const siguienteCustomerCode = ultimoCliente ? ultimoCliente.customerCode + 1 : 1;
        return siguienteCustomerCode;
    }
    async crearCliente(NuevoCliente: any): Promise<{ mensaje: string }> {
        let sonIguales;
        try {
            const InsertCliente = await this.clienteRepository.save(NuevoCliente);

            sonIguales = (
                NuevoCliente.name === InsertCliente.name &&
                NuevoCliente.adrres === InsertCliente.adrres &&
                NuevoCliente.phone === InsertCliente.phone &&
                JSON.stringify(NuevoCliente.direcciones) === JSON.stringify(InsertCliente.direcciones) &&
                NuevoCliente.customerCode === InsertCliente.customerCode
            );

            if (sonIguales) {
                console.log('Insertado con éxito');
                return { mensaje: 'Datos insertados correctamente' };
            } else {
                throw new InternalServerErrorException('Los datos insertados no coinciden con los datos proporcionados');
            }
        } catch (error) {
            // console.error('Error al crear cliente:', error);
            throw new InternalServerErrorException('Error al crear cliente: ' + error.message);
        }
    }
    async getCliente(): Promise<Cliente[]> {
        this.contadorGetClientes();
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
    async updateCliente(customerCode: number, updateData: Partial<ClienteInterface>): Promise<{ mensaje: string }> {
        try {
            const cliente = await this.clienteRepository.findOne({ where: { customerCode } });
            if (!cliente) {
                throw new NotFoundException(`Cliente con customerCode ${customerCode} no encontrado`);
            }

            Object.assign(cliente, updateData);

            await this.clienteRepository.save(cliente);

            return { mensaje: 'Cliente actualizado correctamente' };
        } catch (error) {
            console.error('Error al actualizar cliente:', error);
            throw new InternalServerErrorException('Error al actualizar cliente: ' + error.message);
        }
    }
    async deleteCliente(customerCode: number): Promise<{ mensaje: string }> {
        try {
            const cliente = await this.clienteRepository.findOne({ where: { customerCode } });
            if (!cliente) {
                throw new NotFoundException(`Cliente con customerCode ${customerCode} no encontrado`);
            }

            await this.clienteRepository.remove(cliente);

            return { mensaje: 'Cliente eliminado correctamente' };
        } catch (error) {
            // console.error('Error al eliminar cliente:', error);
            throw new InternalServerErrorException('Error al eliminar cliente: ' + error.message);
        }
    }


}

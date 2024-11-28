import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bono } from '../entities/bono.entity';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class BonoService {
  constructor(
    @InjectRepository(Bono)
    private readonly bonoRepository: Repository<Bono>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async crearBono(bono: Partial<Bono>, userId: number): Promise<Bono> {
    const usuario = await this.usuarioRepository.findOne({ where: { id: userId } });
    if (!usuario || usuario.rol !== 'Profesor') {
      throw new BadRequestException('Solo un usuario con rol de Profesor puede tener bonos.');
    }

    if (!bono.monto || bono.monto <= 0) {
      throw new BadRequestException('El monto del bono debe ser positivo.');
    }

    bono.usuario = usuario;
    return this.bonoRepository.save(bono);
  }

  async findBonoByCodigo(cod: string): Promise<Bono> {
    const id = parseInt(cod, 10); // Convertir a número
    if (isNaN(id)) {
      throw new BadRequestException('El código proporcionado no es un número válido.');
    }
  
    const bono = await this.bonoRepository.findOne({ where: { id } });
    if (!bono) {
      throw new NotFoundException('Bono no encontrado.');
    }
  
    return bono;
  }
  

  async findAllBonosByUsuario(userID: number): Promise<Bono[]> {
    return this.bonoRepository.find({ where: { usuario: { id: userID } } });
  }

  async deleteBono(id: number): Promise<void> {
    const bono = await this.bonoRepository.findOne({ where: { id } });

    if (!bono) {
      throw new NotFoundException('Bono no encontrado.');
    }

    if (bono.calificacion > 4) {
      throw new BadRequestException('No se puede eliminar un bono con calificación mayor a 4.');
    }

    await this.bonoRepository.delete(id);
  }
}

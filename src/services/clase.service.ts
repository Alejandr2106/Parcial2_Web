import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clase } from '../entities/clase.entity';

@Injectable()
export class ClaseService {
  constructor(
    @InjectRepository(Clase)
    private readonly claseRepository: Repository<Clase>,
  ) {}

  async crearClase(clase: Partial<Clase>): Promise<Clase> {
    if (!clase.codigo || clase.codigo.length !== 10) {
      throw new BadRequestException('El código de la clase debe tener 10 caracteres.');
    }

    return this.claseRepository.save(clase);
  }

  async findClaseById(id: number): Promise<Clase> {
    const clase = await this.claseRepository.findOne({ where: { id } });
    if (!clase) {
      throw new NotFoundException('Clase no encontrada.');
    }
    return clase;
  }
}

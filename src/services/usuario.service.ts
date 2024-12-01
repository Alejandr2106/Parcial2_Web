import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async crearUsuario(usuario: Partial<Usuario>): Promise<Usuario> {
    if (usuario.rol === 'Profesor' || usuario.rol === 'profesor') {
      const gruposValidos = ['TICSW', 'IMAGINE', 'COMIT'];
      if (!gruposValidos.includes(usuario.grupoInvestigacion)) {
        throw new BadRequestException(
          'El grupo de investigación no es válido para un Profesor.',
        );
      }
    } else if (usuario.rol === 'Decana') {
      if (
        !usuario.numeroExtension ||
        usuario.numeroExtension.toString().length !== 8
      ) {
        throw new BadRequestException(
          'El número de extensión para una Decana debe tener 8 dígitos.',
        );
      }
    }

    return this.usuarioRepository.save(usuario);
  }

  async findUsuarioById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    return usuario;
  }

  async eliminarUsuario(id: number): Promise<void> {
    const usuario = await this.findUsuarioById(id);

    if (usuario.rol === 'Decana' || usuario.rol === 'decana') {
      throw new BadRequestException(
        'No se puede eliminar un usuario con rol de Decana.',
      );
    }

    if (usuario.bonos && usuario.bonos.length > 0) {
      throw new BadRequestException(
        'No se puede eliminar un usuario que tiene bonos asociados.',
      );
    }

    await this.usuarioRepository.delete(id);
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../entities/usuario.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let mockUsuarioRepository: Partial<Repository<Usuario>>;

  beforeEach(async () => {
    mockUsuarioRepository = {
      save: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        {
          provide: getRepositoryToken(Usuario),
          useValue: mockUsuarioRepository,
        },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
  });

  describe('crearUsuario', () => {
    it('debería lanzar un error si el grupo de investigación no es válido para un profesor', async () => {
      const nuevoUsuario: Partial<Usuario> = {
        cedula: 12345678,
        nombre: 'Juan',
        rol: 'profesor',
        grupoInvestigacion: 'INVALIDO',
      };

      await expect(service.crearUsuario(nuevoUsuario)).rejects.toThrowError(
        new BadRequestException(
          'El grupo de investigación no es válido para un Profesor.',
        ),
      );
    });

    it('debería crear un usuario válido', async () => {
      const nuevoUsuario: Partial<Usuario> = {
        cedula: 12345678,
        nombre: 'Juan',
        rol: 'profesor',
        grupoInvestigacion: 'TICSW',
      };

      (mockUsuarioRepository.save as jest.Mock).mockResolvedValue(
        nuevoUsuario as Usuario,
      );

      const result = await service.crearUsuario(nuevoUsuario);
      expect(result).toEqual(nuevoUsuario);
    });
  });

  describe('findUsuarioById', () => {
    it('debería lanzar un error si el usuario no existe', async () => {
      (mockUsuarioRepository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.findUsuarioById(1)).rejects.toThrowError(
        new NotFoundException('Usuario no encontrado.'),
      );
    });

    it('debería devolver un usuario existente', async () => {
      const usuario: Usuario = {
        id: 1,
        cedula: 12345678,
        nombre: 'Juan',
        grupoInvestigacion: 'TICSW',
        rol: 'profesor',
        numeroExtension: 0,
        jefe: null,
        subordinados: [],
        bonos: [],
        clases: [],
      };

      (mockUsuarioRepository.findOne as jest.Mock).mockResolvedValue(usuario);

      const result = await service.findUsuarioById(1);
      expect(result).toEqual(usuario);
    });
  });

  describe('eliminarUsuario', () => {
    it('debería lanzar un error si el usuario es decana', async () => {
      const usuarioDecana: Usuario = {
        id: 1,
        cedula: 12345678,
        nombre: 'María',
        grupoInvestigacion: '',
        rol: 'decana',
        numeroExtension: 12345678,
        jefe: null,
        subordinados: [],
        bonos: [],
        clases: [],
      };

      (mockUsuarioRepository.findOne as jest.Mock).mockResolvedValue(
        usuarioDecana,
      );

      await expect(service.eliminarUsuario(1)).rejects.toThrowError(
        new BadRequestException(
          'No se puede eliminar un usuario con rol de Decana.',
        ),
      );
    });

    it('debería eliminar un usuario válido', async () => {
      const usuario: Usuario = {
        id: 1,
        cedula: 12345678,
        nombre: 'Juan',
        grupoInvestigacion: 'TICSW',
        rol: 'profesor',
        numeroExtension: 0,
        jefe: null,
        subordinados: [],
        bonos: [],
        clases: [],
      };

      (mockUsuarioRepository.findOne as jest.Mock).mockResolvedValue(usuario);
      (mockUsuarioRepository.delete as jest.Mock).mockResolvedValue(undefined);

      await expect(service.eliminarUsuario(1)).resolves.toBeUndefined();
      expect(mockUsuarioRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { BonoService } from './bono.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Bono } from '../entities/bono.entity';
import { Usuario } from '../entities/usuario.entity';
import { Clase } from '../entities/clase.entity';
import { CreateBonoDto } from 'src/dtos/create-bono.dto';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('BonoService', () => {
  let service: BonoService;
  let bonoRepository: Repository<Bono>;
  let usuarioRepository: Repository<Usuario>;
  let claseRepository: Repository<Clase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BonoService,
        {
          provide: getRepositoryToken(Bono),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Usuario),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Clase),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BonoService>(BonoService);
    bonoRepository = module.get<Repository<Bono>>(getRepositoryToken(Bono));
    usuarioRepository = module.get<Repository<Usuario>>(
      getRepositoryToken(Usuario),
    );
    claseRepository = module.get<Repository<Clase>>(getRepositoryToken(Clase));
  });

  // 'crearBono'
  describe('crearBono', () => {
    it('debería crear un bono correctamente', async () => {
      const createBonoDto: CreateBonoDto = {
        monto: 1000,
        palabraClave: 'educacion',
        usuarioId: 1,
        claseId: 1,
        calificacion: 5,
      };

      const mockUsuario = { id: 1, rol: 'Profesor' } as Usuario;
      const mockClase = { id: 1 } as Clase;
      const mockBono = {
        id: 1,
        ...createBonoDto,
        usuario: mockUsuario,
        clase: mockClase,
      } as Bono;

      jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(mockUsuario);
      jest.spyOn(claseRepository, 'findOne').mockResolvedValue(mockClase);
      jest.spyOn(bonoRepository, 'save').mockResolvedValue(mockBono);

      const result = await service.crearBono(createBonoDto);
      expect(result).toEqual(mockBono);
      expect(bonoRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          monto: createBonoDto.monto,
          palabraClave: createBonoDto.palabraClave,
          usuario: mockUsuario,
          clase: mockClase,
          calificacion: createBonoDto.calificacion,
        }),
      );
    });

    it('debería lanzar una excepción si el usuario no es un Profesor', async () => {
      const createBonoDto: CreateBonoDto = {
        monto: 1000,
        palabraClave: 'educacion',
        usuarioId: 1,
        claseId: 1,
        calificacion: 5,
      };

      const mockUsuario = { id: 1, rol: 'Estudiante' } as Usuario; // No es Profesor
      jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(mockUsuario);

      await expect(service.crearBono(createBonoDto)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('findBonoByCodigo', () => {
    it('debería retornar un bono si el código es válido', async () => {
      const bono = {
        id: 1,
        monto: 1000,
        palabraClave: 'educacion',
        calificacion: 5,
      } as Bono;
      jest.spyOn(bonoRepository, 'findOne').mockResolvedValue(bono);

      const result = await service.findBonoByCodigo('1');
      expect(result).toEqual(bono);
    });

    it('debería lanzar una excepción si el código no es válido', async () => {
      jest.spyOn(bonoRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findBonoByCodigo('999')).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('debería lanzar una excepción si el código no es un número válido', async () => {
      await expect(service.findBonoByCodigo('abc')).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('findAllBonosByUsuario', () => {
    it('debería retornar todos los bonos de un usuario', async () => {
      const bonos = [
        { id: 1, monto: 1000, palabraClave: 'educacion', calificacion: 5 },
        { id: 2, monto: 2000, palabraClave: 'tecnologia', calificacion: 4 },
      ] as Bono[];
      jest.spyOn(bonoRepository, 'find').mockResolvedValue(bonos);

      const result = await service.findAllBonosByUsuario(1);
      expect(result).toEqual(bonos);
    });
  });

  describe('deleteBono', () => {
    it('debería eliminar un bono si la calificación es menor o igual a 4', async () => {
      const bono = { id: 1, calificacion: 4 } as Bono;
      jest.spyOn(bonoRepository, 'findOne').mockResolvedValue(bono);
      jest.spyOn(bonoRepository, 'delete').mockResolvedValue(undefined);

      await service.deleteBono(1);
      expect(bonoRepository.delete).toHaveBeenCalledWith(1);
    });

    it('debería lanzar una excepción si la calificación es mayor a 4', async () => {
      const bono = { id: 1, calificacion: 5 } as Bono;
      jest.spyOn(bonoRepository, 'findOne').mockResolvedValue(bono);

      await expect(service.deleteBono(1)).rejects.toThrowError(
        BadRequestException,
      );
    });

    it('debería lanzar una excepción si el bono no existe', async () => {
      jest.spyOn(bonoRepository, 'findOne').mockResolvedValue(null);

      await expect(service.deleteBono(999)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});

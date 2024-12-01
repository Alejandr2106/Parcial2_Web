import { Test, TestingModule } from '@nestjs/testing';
import { ClaseService } from './clase.service';
import { Clase } from '../entities/clase.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ClaseService', () => {
  let service: ClaseService;
  let repository: Repository<Clase>;

  const mockClaseRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClaseService,
        {
          provide: getRepositoryToken(Clase),
          useValue: mockClaseRepository,
        },
      ],
    }).compile();

    service = module.get<ClaseService>(ClaseService);
    repository = module.get<Repository<Clase>>(getRepositoryToken(Clase));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('crearClase', () => {
    it('debería crear una clase con un código válido (positivo)', async () => {
      const nuevaClase = {
        nombre: 'Matemáticas',
        codigo: '1234567890',
        numeroCreditos: 4,
      };
      mockClaseRepository.save.mockResolvedValue(nuevaClase);

      const resultado = await service.crearClase(nuevaClase);
      expect(resultado).toEqual(nuevaClase);
      expect(mockClaseRepository.save).toHaveBeenCalledWith(nuevaClase);
    });

    it('debería lanzar un error si el código no tiene 10 caracteres (negativo)', async () => {
      const nuevaClase = {
        nombre: 'Física',
        codigo: '12345',
        numeroCreditos: 4,
      };

      await expect(service.crearClase(nuevaClase)).rejects.toThrowError(
        new BadRequestException(
          'El código de la clase debe tener 10 caracteres.',
        ),
      );
      expect(mockClaseRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('findClaseById', () => {
    it('debería retornar una clase existente por su ID (positivo)', async () => {
      const claseExistente = {
        id: 1,
        nombre: 'Matemáticas',
        codigo: '1234567890',
        numeroCreditos: 4,
      };
      mockClaseRepository.findOne.mockResolvedValue(claseExistente);

      const resultado = await service.findClaseById(1);
      expect(resultado).toEqual(claseExistente);
      expect(mockClaseRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('debería lanzar un error si no se encuentra la clase (negativo)', async () => {
      mockClaseRepository.findOne.mockResolvedValue(null);

      await expect(service.findClaseById(99)).rejects.toThrowError(
        new NotFoundException('Clase no encontrada.'),
      );
      expect(mockClaseRepository.findOne).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });
});

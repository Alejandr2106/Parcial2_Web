import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ClaseService } from '../services/clase.service';
import { Clase } from '../entities/clase.entity';

@Controller('clase')
export class ClaseController {
  constructor(private readonly claseService: ClaseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crearClase(@Body() claseData: Partial<Clase>): Promise<Clase> {
    try {
      return await this.claseService.crearClase(claseData);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Get(':id')
  async obtenerClasePorId(@Param('id') id: number): Promise<Clase> {
    try {
      return await this.claseService.findClaseById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}

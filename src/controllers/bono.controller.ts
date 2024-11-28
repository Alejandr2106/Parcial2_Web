import { Controller, Get, Post, Delete, Param, Body, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { BonoService } from '../services/bono.service';
import { Bono } from '../entities/bono.entity';
import { CreateBonoDto } from '../dtos/create-bono.dto';

@Controller('bonos') // Ruta base: /bonos
export class BonoController {
  constructor(private readonly bonoService: BonoService) {}

  @Post() // Ruta: POST /bonos
  @HttpCode(HttpStatus.CREATED)
  async crearBono(@Body() createBonoDto: CreateBonoDto): Promise<Bono> {
    return this.bonoService.crearBono(createBonoDto);
  }

  @Get(':id') // Ruta: GET /bonos/:id
  async findBonoByCodigo(@Param('id', ParseIntPipe) id: number): Promise<Bono> {
    return this.bonoService.findBonoByCodigo(id.toString());
  }

  @Get('usuario/:userId') // Ruta: GET /bonos/usuario/:userId
  async findAllBonosByUsuario(@Param('userId', ParseIntPipe) userId: number): Promise<Bono[]> {
    return this.bonoService.findAllBonosByUsuario(userId);
  }

  @Delete(':id') // Ruta: DELETE /bonos/:id
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBono(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.bonoService.deleteBono(id);
  }
}

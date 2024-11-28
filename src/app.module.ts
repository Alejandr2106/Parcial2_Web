import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bono } from './entities/bono.entity';
import { Usuario } from './entities/usuario.entity';  // Agregar Usuario
import { Clase } from './entities/clase.entity';  // Si tienes Clase también, agrégala
import { BonoService } from './services/bono.service';
import { UsuarioService } from './services/usuario.service'; // Agregar UsuarioService
import { BonoController } from './controllers/bono.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bono, Usuario, Clase]),  // Agregar Usuario y Clase
  ],
  controllers: [BonoController],  // Agregar UsuarioController
  providers: [BonoService, UsuarioService],  // Agregar UsuarioService
})
export class AppModule {}

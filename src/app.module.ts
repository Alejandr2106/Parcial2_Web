import { Module } from '@nestjs/common';
import { UsuarioService } from './services/usuario.service';
import { BonoService } from './services/bono.service';
import { ClaseService } from './services/clase.service';

@Module({
  providers: [UsuarioService, BonoService, ClaseService],
  exports: [UsuarioService, BonoService, ClaseService],
})
export class AppModule {}

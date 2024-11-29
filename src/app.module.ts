import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bono } from './entities/bono.entity';
import { Usuario } from './entities/usuario.entity'; // Agregar Usuario
import { Clase } from './entities/clase.entity';
import { BonoService } from './services/bono.service';
import { UsuarioService } from './services/usuario.service'; // Agregar UsuarioService
import { BonoController } from './controllers/bono.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bono, Usuario, Clase]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcial2_web',
      entities: [Bono, Usuario, Clase],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [BonoController, AppController], // Agregar UsuarioController
  providers: [BonoService, UsuarioService, AppService], // Agregar UsuarioService
})
export class AppModule {}

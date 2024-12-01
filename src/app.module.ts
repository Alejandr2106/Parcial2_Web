import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bono } from './entities/bono.entity';
import { Usuario } from './entities/usuario.entity'; 
import { Clase } from './entities/clase.entity';
import { BonoService } from './services/bono.service';
import { UsuarioService } from './services/usuario.service'; 
import { BonoController } from './controllers/bono.controller';
import { UsuarioController } from './controllers/usuario.controller'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClaseController } from './controllers/clase.controller';
import { ClaseService } from './services/clase.service';

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
  controllers: [BonoController, AppController, UsuarioController, ClaseController], 
  providers: [BonoService, UsuarioService, ClaseService, AppService], 
})
export class AppModule {}

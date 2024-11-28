import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Bono } from './bono.entity';

@Entity()
export class Clase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  codigo: string;

  @Column()
  numeroCreditos: number;

  @ManyToOne(() => Usuario, usuario => usuario.clases)
  profesor: Usuario;

  @OneToMany(() => Bono, bono => bono.clase)
  bonos: Bono[];
}

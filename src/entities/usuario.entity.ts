import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Bono } from './bono.entity';
import { Clase } from './clase.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  grupoInvestigacion: string;

  @Column()
  numeroExtension: number;

  @Column()
  rol: string; // 'profesor' | 'estudiante' | 'administrativo'

  @ManyToOne(() => Usuario, usuario => usuario.subordinados, { nullable: true })
  jefe: Usuario;

  @OneToMany(() => Usuario, usuario => usuario.jefe)
  subordinados: Usuario[];

  @OneToMany(() => Bono, bono => bono.usuario)
  bonos: Bono[];

  @OneToMany(() => Clase, clase => clase.profesor)
  clases: Clase[];
}
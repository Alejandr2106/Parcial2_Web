import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Clase } from './clase.entity';

@Entity()
export class Bono {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  monto: number;

  @Column('float')
  calificacion: number;

  @Column()
  palabraClave: string;

  @ManyToOne(() => Usuario, usuario => usuario.bonos)
  usuario: Usuario;

  @ManyToOne(() => Clase, clase => clase.bonos)
  clase: Clase;
}

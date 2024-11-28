import { IsInt, IsPositive, IsString, IsNotEmpty } from 'class-validator';

export class CreateBonoDto {
  @IsInt()
  @IsPositive()
  monto: number;

  @IsNotEmpty()
  @IsString()
  palabraClave: string;

  @IsNotEmpty()
  @IsInt()
  usuarioId: number;

  @IsNotEmpty()
  @IsInt()
  claseId: number;
}

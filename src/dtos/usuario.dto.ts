import {
  IsInt,
  IsString,
  IsOptional,
  IsIn,
  IsNotEmpty,
  MinLength,
  IsPositive,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  cedula: number;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsIn(['profesor', 'estudiante', 'administrativo', 'decana'])
  @IsNotEmpty()
  rol: string;

  @IsOptional()
  @IsString()
  @IsIn(['TICSW', 'IMAGINE', 'COMIT'])
  grupoInvestigacion?: string; 

  @IsOptional()
  @IsInt()
  @IsPositive()
  numeroExtension?: number; 

  @IsOptional()
  @IsInt()
  @IsPositive()
  jefeId?: number; 
}

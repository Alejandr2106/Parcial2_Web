import {
  IsInt,
  IsString,
  IsNotEmpty,
  MinLength,
  IsPositive,
  MaxLength,
} from 'class-validator';

export class CreateClaseDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @MinLength(10)
  @MaxLength(10)
  @IsNotEmpty()
  codigo: string; 

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  numeroCreditos: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  profesorId: number; 
}

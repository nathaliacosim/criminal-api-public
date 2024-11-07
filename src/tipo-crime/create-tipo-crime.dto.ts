import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTipoCrimeDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do tipo de crime é obrigatório.' })
  @MaxLength(255, {
    message: 'O nome do tipo de crime deve ter no máximo 255 caracteres.',
  })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'A descrição do tipo de crime é obrigatória.' })
  @MaxLength(500, {
    message: 'A descrição do tipo de crime deve ter no máximo 500 caracteres.',
  })
  descricao: string;
}

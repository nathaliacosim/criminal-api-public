import { IsString } from 'class-validator';

export class CreateSuspeitoDto {
  @IsString()
  nome: string;

  @IsString()
  descricao: string;
}

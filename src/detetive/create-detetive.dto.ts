import { IsString } from 'class-validator';

export class CreateDetetiveDto {
  @IsString()
  nome: string;

  @IsString()
  especialidade: string;
}

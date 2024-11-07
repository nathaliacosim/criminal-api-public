import { IsString, IsOptional } from 'class-validator';

export class CreateTestemunhaDto {
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  contato?: string;
}

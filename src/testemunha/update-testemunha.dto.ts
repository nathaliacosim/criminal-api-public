import { IsString, IsDateString, IsEnum, IsOptional } from 'class-validator';

export class UpdateTestemunhaDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsDateString()
  dataNascimento?: string;

  @IsOptional()
  @IsString()
  endereco?: string;

  @IsOptional()
  @IsEnum(['Ocular', 'Auditiva', 'Especialista', 'Caráter', 'Circunstancial'])
  tipoTestemunha?: 'Ocular' | 'Auditiva' | 'Especialista' | 'Caráter' | 'Circunstancial';

  @IsOptional()
  @IsString()
  alibi?: string;

  @IsOptional()
  @IsEnum(['Parente', 'Amigo', 'Colega de trabalho', 'Vizinho', 'Parceiro(a) romântico(a)', 'Antigo parceiro(a)', 'Conhecido', 'Desconhecido'])
  relacaoComVitima?: 'Parente' | 'Amigo' | 'Colega de trabalho' | 'Vizinho' | 'Parceiro(a) romântico(a)' | 'Antigo parceiro(a)' | 'Conhecido' | 'Desconhecido';

  @IsOptional()
  @IsString()
  depoimento?: string;

  @IsOptional()
  @IsEnum(['Alta', 'Média', 'Baixa'])
  confiabilidade?: 'Alta' | 'Média' | 'Baixa';
}

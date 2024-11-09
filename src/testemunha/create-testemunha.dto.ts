import { IsString, IsDateString, IsEnum, IsOptional } from 'class-validator';

export class CreateTestemunhaDto {
  @IsString()
  nome: string;

  @IsDateString()
  dataNascimento: string;

  @IsString()
  endereco: string;

  @IsEnum(['Ocular', 'Auditiva', 'Especialista', 'Caráter', 'Circunstancial'])
  tipoTestemunha: 'Ocular' | 'Auditiva' | 'Especialista' | 'Caráter' | 'Circunstancial';

  @IsOptional()
  @IsString()
  alibi?: string;

  @IsEnum(['Parente', 'Amigo', 'Colega de trabalho', 'Vizinho', 'Parceiro(a) romântico(a)', 'Antigo parceiro(a)', 'Conhecido', 'Desconhecido'])
  relacaoComVitima: 'Parente' | 'Amigo' | 'Colega de trabalho' | 'Vizinho' | 'Parceiro(a) romântico(a)' | 'Antigo parceiro(a)' | 'Conhecido' | 'Desconhecido';

  @IsString()
  depoimento: string;

  @IsEnum(['Alta', 'Média', 'Baixa'])
  confiabilidade: 'Alta' | 'Média' | 'Baixa';
}
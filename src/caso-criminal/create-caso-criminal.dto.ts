import { IsString, IsEnum, IsOptional, Matches } from 'class-validator';

export class CreateCasoCriminalDto {
  @IsString()
  nomeVitima: string;

  @IsString()
  descricaoCrime: string;

  @IsString()
  tipoCrime: string;

  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'dataAbertura deve estar no formato YYYY-MM-DD',
  })
  dataAbertura: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'dataFechamento deve estar no formato YYYY-MM-DD',
  })
  dataFechamento?: string;

  @IsEnum(['Aberto', 'Fechado', 'Em Investigação', 'Suspenso', 'Arquivado'])
  statusCaso: string;

  @IsOptional()
  suspeitos?: string[];

  @IsOptional()
  testemunhas?: string[];

  @IsOptional()
  detetives?: string[];
}

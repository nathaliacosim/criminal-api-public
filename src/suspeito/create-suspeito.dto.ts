import { IsString, IsDate, IsEnum } from 'class-validator';

export class CreateSuspeitoDto {
  @IsString()
  nome: string;

  @IsDate()
  dataNascimento: Date;

  @IsString()
  endereco: string;

  @IsString()
  descricaoFisica: string;

  @IsString()
  alibi: string;

  @IsEnum(['Parente', 'Amigo', 'Colega de trabalho', 'Vizinho', 'Parceiro(a) romântico(a)', 'Antigo parceiro(a)', 'Conhecido', 'Desconhecido'])
  relacaoComVitima: string;

  @IsEnum(['Primário', 'Secundário', 'Terciário', 'Cúmplice', 'Pessoa de interesse'])
  grauSuspeito: string;
}

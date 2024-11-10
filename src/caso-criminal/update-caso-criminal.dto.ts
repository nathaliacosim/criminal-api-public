import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsDateString, IsEnum } from 'class-validator';

export enum StatusCaso {
  EM_ANDAMENTO = 'Em andamento',
  CONCLUIDO = 'Concluído',
  PENDENTE = 'Pendente',
}

export class UpdateCasoCriminalDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nomeVitima?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  descricaoCrime?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tipoCrime?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  dataFechamento?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(StatusCaso)
  statusCaso?: StatusCaso;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  suspeitos?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  testemunhas?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  detetives?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  evidencias?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  entrevistas?: string[];
}

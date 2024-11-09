import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsEnum, IsDateString, IsOptional, IsMongoId } from 'class-validator';
import { CreateEntrevistaDto } from './create-entrevista.dto';

export class UpdateEntrevistaDto extends PartialType(CreateEntrevistaDto) {
  @ApiProperty({ description: 'Nome do entrevistado', required: false })
  @IsString()
  @IsOptional()
  entrevistado?: string;

  @ApiProperty({ description: 'Tipo do entrevistado (exemplo: Testemunha, Suspeito)', required: false })
  @IsString()
  @IsOptional()
  tipoEntrevistado?: string;

  @ApiProperty({ description: 'Tipo da entrevista (online ou presencial)', enum: ['online', 'presencial'], required: false })
  @IsEnum(['online', 'presencial'])
  @IsOptional()
  tipoEntrevista?: string;

  @ApiProperty({ description: 'Local da entrevista (endereço físico ou plataforma online)', required: false })
  @IsString()
  @IsOptional()
  localEntrevista?: string;

  @ApiProperty({ description: 'ID do caso criminal relacionado', required: false })
  @IsMongoId()
  @IsOptional()
  casoCriminal?: string;

  @ApiProperty({ description: 'Motivo da entrevista', enum: ['Investigação', 'Esclarecimento', 'Depoimento', 'Outros'], required: false })
  @IsEnum(['Investigação', 'Esclarecimento', 'Depoimento', 'Outros'])
  @IsOptional()
  motivoEntrevista?: string;

  @ApiProperty({ description: 'Nome do responsável pela entrevista', required: false })
  @IsString()
  @IsOptional()
  nomeResponsavel?: string;

  @ApiProperty({ description: 'Ata da entrevista', required: false })
  @IsString()
  @IsOptional()
  ataEntrevista?: string;

  @ApiProperty({ description: 'Data e hora de início da entrevista (formato: YYYY-MM-DDTHH:mm:ss)', required: false })
  @IsDateString()
  @IsOptional()
  dataHoraInicio?: string;

  @ApiProperty({ description: 'Data e hora de término da entrevista (formato: YYYY-MM-DDTHH:mm:ss)', required: false })
  @IsDateString()
  @IsOptional()
  dataHoraFim?: string;
}

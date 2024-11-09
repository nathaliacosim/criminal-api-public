import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNotEmpty, IsDateString, IsMongoId, Length } from 'class-validator';

export class CreateEntrevistaDto {
  @ApiProperty({ description: 'Nome do entrevistado' })
  @IsString()
  @IsNotEmpty()
  entrevistado: string;

  @ApiProperty({ description: 'Tipo do entrevistado', enum: ['Testemunha', 'Suspeito', 'Detetive', 'Outros'] })
  @IsEnum(['Testemunha', 'Suspeito', 'Detetive', 'Outros'])
  @IsNotEmpty()
  tipoEntrevistado: string;

  @ApiProperty({ description: 'Tipo da entrevista', enum: ['online', 'presencial'] })
  @IsEnum(['online', 'presencial'])
  @IsNotEmpty()
  tipoEntrevista: string;

  @ApiProperty({ description: 'Local da entrevista (endereço físico ou plataforma online)' })
  @IsString()
  @IsNotEmpty()
  localEntrevista: string;

  @ApiProperty({ description: 'ID do caso criminal relacionado (ID válido)' })
  @IsMongoId()
  @IsNotEmpty()
  casoCriminal: string;

  @ApiProperty({ description: 'Motivo da entrevista', enum: ['Investigação', 'Depoimento', 'Interrogatório', 'Outros'] })
  @IsEnum(['Investigação', 'Depoimento', 'Interrogatório', 'Outros'])
  @IsNotEmpty()
  motivoEntrevista: string;

  @ApiProperty({ description: 'Nome do responsável pela entrevista' })
  @IsString()
  @IsNotEmpty()
  nomeResponsavel: string;

  @ApiProperty({ description: 'Ata da entrevista (texto grande)' })
  @IsString()
  @Length(1, 2000, { message: 'A ata deve ter no mínimo 1 e no máximo 2000 caracteres.' })
  ataEntrevista: string;

  @ApiProperty({ description: 'Data e hora de início da entrevista (formato: YYYY-MM-DDTHH:mm:ss)' })
  @IsDateString()
  @IsNotEmpty()
  dataHoraInicio: string;

  @ApiProperty({ description: 'Data e hora de fim da entrevista (formato: YYYY-MM-DDTHH:mm:ss)' })
  @IsDateString()
  @IsNotEmpty()
  dataHoraFim: string;
}

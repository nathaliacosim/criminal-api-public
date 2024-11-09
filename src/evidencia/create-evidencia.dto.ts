import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsDate, IsOptional, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { Detetive } from 'src/detetive/detetive.schema';
import { CasoCriminal } from 'src/caso-criminal/caso-criminal.schema';

export class CreateEvidenciaDto {
  @ApiProperty({ description: 'ID do caso criminal relacionado' })
  @IsMongoId()
  @IsNotEmpty()
  casoCriminal: CasoCriminal;

  @ApiProperty({ description: 'Tipo da evidência', enum: ['Arma', 'Documento', 'Objeto', 'Material Biológico', 'Áudio', 'Vídeo', 'Outros'] })
  @IsEnum(['Arma', 'Documento', 'Objeto', 'Material Biológico', 'Áudio', 'Vídeo', 'Outros'])
  tipoEvidencia: string;

  @ApiProperty({ description: 'Descrição detalhada da evidência' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ description: 'Localização onde a evidência foi encontrada' })
  @IsString()
  @IsNotEmpty()
  localizacao: string;

  @ApiProperty({ description: 'ID do detetive que localizou a evidência' })
  @IsMongoId()
  @IsNotEmpty()
  quemLocalizou: Detetive;

  @ApiProperty({ description: 'Data do encontro da evidência' })
  @IsDate()
  @Type(() => Date)
  dataEncontro: Date;

  @ApiProperty({ description: 'Status da evidência', enum: ['Boa', 'Ruim', 'Inutilizável'] })
  @IsEnum(['Boa', 'Ruim', 'Inutilizável'])
  statusEvidencia: string;

  @ApiProperty({ description: 'Observações adicionais sobre a evidência', required: false })
  @IsString()
  @IsOptional()
  observacoes?: string;
}

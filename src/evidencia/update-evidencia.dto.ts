import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsDate, IsOptional, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { Detetive } from 'src/detetive/detetive.schema';
import { CasoCriminal } from 'src/caso-criminal/caso-criminal.schema';

export class UpdateEvidenciaDto {
  @ApiProperty({ description: 'Tipo da evidência', enum: ['Arma', 'Documento', 'Objeto', 'Material Biológico', 'Áudio', 'Vídeo', 'Outros'], required: false })
  @IsEnum(['Arma', 'Documento', 'Objeto', 'Material Biológico', 'Áudio', 'Vídeo', 'Outros'])
  @IsOptional()
  tipoEvidencia?: string;

  @ApiProperty({ description: 'Descrição detalhada da evidência', required: false })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({ description: 'Localização onde a evidência foi encontrada', required: false })
  @IsString()
  @IsOptional()
  localizacao?: string;

  @ApiProperty({ description: 'ID do detetive que localizou a evidência', required: false })
  @IsMongoId()
  @IsOptional()
  quemLocalizou?: Detetive;

  @ApiProperty({ description: 'Data do encontro da evidência', required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dataEncontro?: Date;

  @ApiProperty({ description: 'Status da evidência', enum: ['Boa', 'Ruim', 'Inutilizável'], required: false })
  @IsEnum(['Boa', 'Ruim', 'Inutilizável'])
  @IsOptional()
  statusEvidencia?: string;

  @ApiProperty({ description: 'Observações adicionais sobre a evidência', required: false })
  @IsString()
  @IsOptional()
  observacoes?: string;
}

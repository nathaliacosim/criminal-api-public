import { IsString, IsEnum, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDetetiveDto {
  @ApiProperty({ description: 'Nome do detetive', required: false, example: 'João Silva' })
  @IsString()
  @IsOptional()
  nome?: string;

  @ApiProperty({ description: 'Data de nascimento do detetive', required: false, example: '1985-10-20' })
  @IsDateString()
  @IsOptional()
  dataNascimento?: string;

  @ApiProperty({ description: 'Tipo de detetive', enum: ['Policial', 'Particular'], required: false, example: 'Particular' })
  @IsEnum(['Policial', 'Particular'])
  @IsOptional()
  tipo?: 'Policial' | 'Particular';

  @ApiProperty({
    description: 'Patente do detetive',
    enum: ['Detetive', 'Detetive de 1ª Classe', 'Investigador Chefe'],
    required: false,
    example: 'Investigador Chefe',
  })
  @IsEnum(['Detetive', 'Detetive de 1ª Classe', 'Investigador Chefe'])
  @IsOptional()
  patente?: 'Detetive' | 'Detetive de 1ª Classe' | 'Investigador Chefe';

  @ApiProperty({
    description: 'Especialidade do detetive',
    enum: ['Homicídios', 'Fraudes', 'Tráfico de Drogas', 'Roubos', 'Outros'],
    required: false,
    example: 'Fraudes',
  })
  @IsEnum(['Homicídios', 'Fraudes', 'Tráfico de Drogas', 'Roubos', 'Outros'])
  @IsOptional()
  especialidade?: 'Homicídios' | 'Fraudes' | 'Tráfico de Drogas' | 'Roubos' | 'Outros';

  @ApiProperty({ description: 'Depoimento do detetive', required: false, example: 'Ele tem uma vasta experiência em casos de fraudes.' })
  @IsString()
  @IsOptional()
  depoimento?: string;
}

import { IsString, IsEnum, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDetetiveDto {
  @ApiProperty({ description: 'Nome do detetive', example: 'João Silva' })
  @IsString()
  nome: string;

  @ApiProperty({ description: 'Data de nascimento do detetive', example: '1985-10-20' })
  @IsDateString()
  dataNascimento: string;

  @ApiProperty({ description: 'Tipo de detetive', enum: ['Policial', 'Particular'], example: 'Policial' })
  @IsEnum(['Policial', 'Particular'])
  tipo: 'Policial' | 'Particular';

  @ApiProperty({
    description: 'Patente do detetive',
    enum: ['Detetive', 'Detetive de 1ª Classe', 'Investigador Chefe'],
    required: false,
    example: 'Detetive de 1ª Classe',
  })
  @IsEnum(['Detetive', 'Detetive de 1ª Classe', 'Investigador Chefe'])
  @IsOptional()
  patente?: 'Detetive' | 'Detetive de 1ª Classe' | 'Investigador Chefe';

  @ApiProperty({
    description: 'Especialidade do detetive',
    enum: ['Homicídios', 'Fraudes', 'Tráfico de Drogas', 'Roubos', 'Outros'],
    required: false,
    example: 'Homicídios',
  })
  @IsEnum(['Homicídios', 'Fraudes', 'Tráfico de Drogas', 'Roubos', 'Outros'])
  @IsOptional()
  especialidade?: 'Homicídios' | 'Fraudes' | 'Tráfico de Drogas' | 'Roubos' | 'Outros';
}

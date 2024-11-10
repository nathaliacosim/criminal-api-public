import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, IsDateString, IsEnum } from 'class-validator';

export class CreateCasoCriminalDto {
  @ApiProperty()
  @IsString()
  nomeVitima: string;

  @ApiProperty()
  @IsString()
  descricaoCrime: string;

  @ApiProperty()
  @IsString()
  tipoCrime: string;

  @ApiProperty()
  @IsDateString()
  dataAbertura: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  dataFechamento?: string;

  @ApiProperty()
  @IsString()
  statusCaso: string;

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

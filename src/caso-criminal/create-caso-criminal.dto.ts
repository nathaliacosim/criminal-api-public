import { ApiProperty } from '@nestjs/swagger';

export class CreateCasoCriminalDto {
  @ApiProperty()
  nomeVitima: string;

  @ApiProperty()
  descricaoCrime: string;

  @ApiProperty()
  tipoCrime: string;

  @ApiProperty()
  dataAbertura: string;

  @ApiProperty({ required: false })
  dataFechamento?: string;

  @ApiProperty()
  statusCaso: string;

  @ApiProperty({ type: [String], required: false })
  suspeitos?: string[];

  @ApiProperty({ type: [String], required: false })
  testemunhas?: string[];

  @ApiProperty({ type: [String], required: false })
  detetives?: string[];

  @ApiProperty({ type: [String], required: false })
  evidencias?: string[];

  @ApiProperty({ type: [String], required: false })
  entrevistas?: string[];
}
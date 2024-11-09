import { ApiProperty } from '@nestjs/swagger';

export class UpdateCasoCriminalDto {
  @ApiProperty({ required: false })
  nomeVitima?: string;

  @ApiProperty({ required: false })
  descricaoCrime?: string;

  @ApiProperty({ required: false })
  tipoCrime?: string;

  @ApiProperty({ required: false })
  dataFechamento?: string;

  @ApiProperty({ required: false })
  statusCaso?: string;

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

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

  @ApiProperty({ type: [String] })
  suspeitos: string[];

  @ApiProperty({ type: [String] })
  testemunhas: string[];

  @ApiProperty({ type: [String] })
  detetives: string[];

  @ApiProperty({ type: [String] })
  evidencias: string[];
}
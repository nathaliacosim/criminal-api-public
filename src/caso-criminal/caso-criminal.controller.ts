// src/caso-criminal/caso-criminal.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  BadRequestException,
  Delete,
  Param,
} from '@nestjs/common';
import { CasoCriminalService } from './caso-criminal.service';
import { CreateCasoCriminalDto } from './create-caso-criminal.dto';
import { CasoCriminal } from './caso-criminal.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Caso } from './caso-criminal.model';
import { TipoCrimeService } from 'src/tipo-crime/tipo-crime.service';

@ApiTags('caso-criminal')
@Controller('caso-criminal')
export class CasoCriminalController {
  constructor(
    private readonly casoCriminalService: CasoCriminalService,
    private readonly tipoCrimeService: TipoCrimeService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obter todos os casos criminais' })
  @ApiResponse({ status: 200, description: 'Lista de casos criminais.' })
  getAllCasosCriminais(): Promise<CasoCriminal[]> {
    return this.casoCriminalService.getAllCasosCriminais();
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo caso criminal' })
  @ApiResponse({
    status: 201,
    description: 'Caso criminal criado com sucesso.',
    type: Caso,
  })
  @ApiBody({
    description: 'Informações do caso para cadastro.',
    type: CreateCasoCriminalDto,
    examples: {
      'application/json': {
        value: {
          nomeVitima: 'João da Silva',
          descricaoCrime: 'Assalto a Mão Armada',
          tipoCrime: '672d0b72318996c2f4f73288',
          dataAbertura: '2024-11-07',
          dataFechamento: '2024-11-10',
          statusCaso: 'Aberto',
          suspeitos: ['Suspeito 1'],
          testemunhas: ['Testemunha 1'],
          detetives: ['Detetive 1'],
        },
      },
    },
  })
  createCasoCriminal(
    @Body() createCasoCriminalDto: CreateCasoCriminalDto,
  ): Promise<CasoCriminal> {
    const tipoCrimeExistente = this.tipoCrimeService.findById(
      createCasoCriminalDto.tipoCrime,
    );

    if (!tipoCrimeExistente) {
      throw new BadRequestException('Tipo de crime não encontrado.');
    }

    return this.casoCriminalService.createCasoCriminal(createCasoCriminalDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um caso criminal' })
  @ApiResponse({
    status: 200,
    description: 'Caso criminal deletado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Caso criminal não encontrado.',
  })
  async deleteCasoCriminal(@Param('id') id: string): Promise<void> {
    await this.casoCriminalService.deleteCasoCriminal(id);
  }
}

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CasoCriminal } from './caso-criminal.schema';
import { CasoCriminalService } from './caso-criminal.service';
import { CreateCasoCriminalDto } from './create-caso-criminal.dto';
import { UpdateCasoCriminalDto } from './update-caso-criminal.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('caso-criminal')
@Controller('caso-criminal')
export class CasoCriminalController {
  constructor(private readonly casoCriminalService: CasoCriminalService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todos os casos criminais' })
  @ApiResponse({ status: 200, description: 'Lista de casos criminais.' })
  getAllCasosCriminais(@Query() query: any): Promise<CasoCriminal[]> {
    return this.casoCriminalService.getAllCasosCriminais();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um caso criminal pelo ID' })
  @ApiResponse({ status: 200, description: 'Caso criminal encontrado.' })
  @ApiResponse({ status: 404, description: 'Caso criminal não encontrado.' })
  getCasoCriminal(@Param('id') id: string): Promise<CasoCriminal> {
    return this.casoCriminalService.getCasoCriminalById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo caso criminal' })
  @ApiResponse({
    status: 201,
    description: 'Caso criminal criado com sucesso.',
  })
  @ApiBody({
    description: 'Informações para cadastro do caso criminal.',
    type: CreateCasoCriminalDto,
    examples: {
      'application/json': {
        value: {
          nomeVitima: 'João da Silva',
          descricaoCrime: 'Assalto a Mão Armada',
          tipoCrime: 'Roubo',
          dataAbertura: '2024-11-07',
          dataFechamento: '2024-11-10',
          statusCaso: 'Aberto',
          suspeitos: ['Suspeito 1'],
          testemunhas: ['Testemunha 1'],
          detetives: ['Detetive 1'],
          evidencias: ['Evidencia 1'],
        },
      },
    },
  })
  async createCasoCriminal(
    @Body() createCasoCriminalDto: CreateCasoCriminalDto,
  ): Promise<CasoCriminal> {
    return this.casoCriminalService.createCasoCriminal(createCasoCriminalDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um caso criminal' })
  @ApiResponse({
    status: 200,
    description: 'Caso criminal atualizado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Caso criminal não encontrado.',
  })
  @ApiBody({
    description: 'Informações para atualização do caso criminal.',
    type: UpdateCasoCriminalDto,
    examples: {
      'application/json': {
        value: {
          nomeVitima: 'Maria Souza',
          descricaoCrime: 'Furto em residência',
          tipoCrime: 'Furto',
          dataFechamento: '2024-11-09',
          statusCaso: 'Fechado',
          suspeitos: ['Suspeito 2'],
          testemunhas: ['Testemunha 2'],
          detetives: ['Detetive 2'],
          evidencias: ['Evidencia 2'],
        },
      },
    },
  })
  async updateCasoCriminal(
    @Param('id') id: string,
    @Body() updateCasoCriminalDto: UpdateCasoCriminalDto,
  ): Promise<CasoCriminal> {
    return this.casoCriminalService.updateCasoCriminal(id, updateCasoCriminalDto);
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

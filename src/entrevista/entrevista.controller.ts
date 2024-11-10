import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { EntrevistaService } from './entrevista.service';
import { CreateEntrevistaDto } from './create-entrevista.dto';
import { UpdateEntrevistaDto } from './update-entrevista.dto';
import { Entrevista } from './entrevista.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { NotFoundException } from '@nestjs/common';

@ApiTags('Entrevistas')
@Controller('entrevistas')
export class EntrevistaController {
  constructor(private readonly entrevistaService: EntrevistaService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova entrevista' })
  @ApiResponse({ status: 201, description: 'Entrevista criada com sucesso.' })
  @ApiBody({
    type: CreateEntrevistaDto,
    description: 'Dados para criação de uma nova entrevista',
    examples: {
      'application/json': {
        value: {
          entrevistado: 'João da Silva',
          tipoEntrevistado: 'Suspeito',
          tipoEntrevista: 'Interrogatório',
          localEntrevista: 'Delegacia de Polícia',
          casoCriminal: '60d2a76d96d3e150a7f380e3',
          motivoEntrevista: 'Esclarecimento de fatos',
          nomeResponsavel: 'Carlos Pereira',
          ataEntrevista: 'Texto da ata da entrevista...',
          dataHoraInicio: '2024-11-09T10:00:00Z',
          dataHoraFim: '2024-11-09T12:00:00Z',
        },
      },
    },
  })
  async create(@Body() createEntrevistaDto: CreateEntrevistaDto): Promise<Entrevista> {
    return this.entrevistaService.create(createEntrevistaDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma entrevista existente' })
  @ApiResponse({ status: 200, description: 'Entrevista atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Entrevista não encontrada.' })
  async update(
    @Param('id') id: string,
    @Body() updateEntrevistaDto: UpdateEntrevistaDto,
  ): Promise<Entrevista> {
    return this.entrevistaService.update(id, updateEntrevistaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar uma entrevista' })
  @ApiResponse({ status: 200, description: 'Entrevista deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Entrevista não encontrada.' })
  async delete(@Param('id') id: string): Promise<boolean> {
    const result = await this.entrevistaService.delete(id);
    if (!result) {
      throw new NotFoundException('Entrevista não encontrada');
    }
    return true;
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as entrevistas' })
  @ApiResponse({ status: 200, description: 'Lista de entrevistas' })
  async findAll(): Promise<Entrevista[]> {
    return this.entrevistaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma entrevista por ID' })
  @ApiResponse({ status: 200, description: 'Entrevista encontrada.' })
  @ApiResponse({ status: 404, description: 'Entrevista não encontrada.' })
  async findOne(@Param('id') id: string): Promise<Entrevista> {
    return this.entrevistaService.findOne(id);
  }

  @Get('caso/:casoId')
  @ApiOperation({ summary: 'Buscar entrevistas de um caso criminal' })
  @ApiResponse({ status: 200, description: 'Entrevistas encontradas.' })
  async findByCaso(@Param('casoId') casoId: string): Promise<Entrevista[]> {
    return this.entrevistaService.findByCaso(casoId);
  }
}

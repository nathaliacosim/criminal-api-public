import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { EvidenciaService } from './evidencia.service';
import { CreateEvidenciaDto } from './create-evidencia.dto';
import { UpdateEvidenciaDto } from './update-evidencia.dto';
import { Evidencia } from './evidencia.schema';

@ApiTags('Evidências')
@Controller('evidencias')
export class EvidenciaController {
  constructor(private readonly evidenciaService: EvidenciaService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova evidência' })
  @ApiBody({
    type: CreateEvidenciaDto,
    examples: {
      'application/json': {
        value: {
          casoCriminal: '60b8d1a2e4b0a2c90f82a4f4',
          tipoEvidencia: 'Arma',
          descricao: 'Pistola calibre 9mm encontrada no local do crime',
          localizacao: 'Sala principal da residência, sob a mesa',
          quemLocalizou: '60b8d1a2e4b0a2c90f82a4f5',
          dataEncontro: '2024-11-09T14:30:00.000Z',
          statusEvidencia: 'Boa',
          observacoes: 'Nenhum sinal de dano ou desgaste visível',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Evidência criada com sucesso' })
  async create(@Body() createEvidenciaDto: CreateEvidenciaDto): Promise<Evidencia> {
    return this.evidenciaService.create(createEvidenciaDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma evidência existente' })
  @ApiParam({ name: 'id', description: 'ID da evidência' })
  @ApiBody({ type: UpdateEvidenciaDto })
  @ApiResponse({ status: 200, description: 'Evidência atualizada com sucesso' })
  async update(@Param('id') id: string, @Body() updateEvidenciaDto: UpdateEvidenciaDto): Promise<Evidencia> {
    return this.evidenciaService.update(id, updateEvidenciaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as evidências' })
  @ApiResponse({ status: 200, description: 'Lista de evidências' })
  async findAll(): Promise<Evidencia[]> {
    return this.evidenciaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma evidência por ID' })
  @ApiParam({ name: 'id', description: 'ID da evidência' })
  @ApiResponse({ status: 200, description: 'Detalhes da evidência' })
  async findById(@Param('id') id: string): Promise<Evidencia> {
    return this.evidenciaService.findById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir uma evidência' })
  @ApiParam({ name: 'id', description: 'ID da evidência' })
  @ApiResponse({ status: 204, description: 'Evidência excluída com sucesso' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.evidenciaService.delete(id);
  }
}

import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { TestemunhaService } from './testemunha.service';
import { CreateTestemunhaDto } from './create-testemunha.dto';
import { UpdateTestemunhaDto } from './update-testemunha.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { Testemunha } from './testemunha.schema';

@ApiTags('Testemunhas')
@Controller('testemunhas')
export class TestemunhaController {
  constructor(private readonly testemunhaService: TestemunhaService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova testemunha' })
  @ApiBody({
    type: CreateTestemunhaDto,
    examples: {
      'application/json': {
        value: {
          nome: 'João Silva',
          dataNascimento: '1985-06-15',
          endereco: 'Rua das Flores, 123',
          tipoTestemunha: 'Ocular',
          alibi: 'Estava em casa durante o ocorrido.',
          relacaoComVitima: 'Amigo',
          depoimento: 'Vi a vítima sendo atacada.',
          confiabilidade: 'Alta',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Testemunha criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() createTestemunhaDto: CreateTestemunhaDto): Promise<Testemunha> {
    return this.testemunhaService.create(createTestemunhaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as testemunhas' })
  @ApiResponse({ status: 200, description: 'Retorna uma lista de testemunhas.' })
  async findAll(): Promise<Testemunha[]> {
    return this.testemunhaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar testemunha por ID' })
  @ApiResponse({ status: 200, description: 'Retorna a testemunha correspondente ao ID.' })
  @ApiResponse({ status: 404, description: 'Testemunha não encontrada.' })
  async findById(@Param('id') id: string): Promise<Testemunha> {
    return this.testemunhaService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma testemunha existente' })
  @ApiBody({
    type: UpdateTestemunhaDto,
    examples: {
      'application/json': {
        value: {
          nome: 'João Silva',
          tipoTestemunha: 'Auditiva',
          alibi: 'Estava ouvindo música durante o ocorrido.',
          relacaoComVitima: 'Vizinho',
          depoimento: 'Ouvi gritos vindo do apartamento ao lado.',
          confiabilidade: 'Média',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Testemunha atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Testemunha não encontrada.' })
  async update(
    @Param('id') id: string,
    @Body() updateTestemunhaDto: UpdateTestemunhaDto,
  ): Promise<Testemunha> {
    return this.testemunhaService.update(id, updateTestemunhaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir uma testemunha' })
  @ApiResponse({ status: 200, description: 'Testemunha excluída com sucesso.' })
  @ApiResponse({ status: 404, description: 'Testemunha não encontrada.' })
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.testemunhaService.delete(id);
  }
}

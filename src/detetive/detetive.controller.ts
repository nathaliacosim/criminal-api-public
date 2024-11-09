import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { DetetiveService } from './detetive.service';
import { CreateDetetiveDto } from './create-detetive.dto';
import { UpdateDetetiveDto } from './update-detetive.dto';
import { Detetive } from './detetive.schema';

@ApiTags('Detetives')
@Controller('detetives')
export class DetetiveController {
  constructor(private readonly detetiveService: DetetiveService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo detetive' })
  @ApiBody({
    description: 'Informações para criar um novo detetive',
    type: CreateDetetiveDto,
    examples: {
      exemplo1: {
        value: {
          nome: 'Carlos Silva',
          dataNascimento: '1985-10-20T00:00:00.000Z',
          tipo: 'Policial',
          patente: 'Detetive',
          especialidade: 'Homicídios',
          depoimento: 'O detetive foi fundamental na investigação.',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Detetive criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao criar detetive' })
  async create(@Body() createDetetiveDto: CreateDetetiveDto): Promise<Detetive> {
    return this.detetiveService.create(createDetetiveDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os detetives' })
  @ApiResponse({ status: 200, description: 'Lista de detetives' })
  @ApiResponse({ status: 500, description: 'Erro ao listar detetives' })
  async findAll(): Promise<Detetive[]> {
    return this.detetiveService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um detetive pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do detetive' })
  @ApiResponse({ status: 200, description: 'Detetive encontrado' })
  @ApiResponse({ status: 404, description: 'Detetive não encontrado' })
  async findById(@Param('id') id: string): Promise<Detetive> {
    return this.detetiveService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar informações de um detetive' })
  @ApiParam({ name: 'id', description: 'ID do detetive' })
  @ApiBody({ type: UpdateDetetiveDto })
  @ApiResponse({ status: 200, description: 'Detetive atualizado' })
  @ApiResponse({ status: 404, description: 'Detetive não encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updateDetetiveDto: UpdateDetetiveDto,
  ): Promise<Detetive> {
    return this.detetiveService.update(id, updateDetetiveDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um detetive' })
  @ApiParam({ name: 'id', description: 'ID do detetive' })
  @ApiResponse({ status: 200, description: 'Detetive deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Detetive não encontrado' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.detetiveService.delete(id);
  }
}

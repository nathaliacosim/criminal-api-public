import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TestemunhaService } from './testemunha.service';
import { CreateTestemunhaDto } from './create-testemunha.dto';
import { UpdateTestemunhaDto } from './update-testemunha.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Testemunhas')
@Controller('testemunhas')
export class TestemunhaController {
  constructor(private readonly testemunhaService: TestemunhaService) {}

  @Post()
  @ApiBody({
    description: 'Dados para criação de uma nova testemunha',
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
          casoCriminal: 'ID caso criminal', 
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Testemunha criada com sucesso',
  })
  async create(@Body() createTestemunhaDto: CreateTestemunhaDto) {
    return await this.testemunhaService.create(createTestemunhaDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Retorna todas as testemunhas',
  })
  async findAll() {
    return await this.testemunhaService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Retorna uma testemunha específica',
  })
  async findById(@Param('id') id: string) {
    const testemunha = await this.testemunhaService.findById(id);
    if (!testemunha) throw new NotFoundException('Testemunha não encontrada');
    return testemunha;
  }

  @Put(':id')
  @ApiBody({
    description: 'Dados para atualização de uma testemunha existente',
    examples: {
      'application/json': {
        value: {
          nome: 'João Silva',
          tipoTestemunha: 'Auditiva',
          alibi: 'Estava ouvindo música durante o ocorrido.',
          relacaoComVitima: 'Vizinho',
          depoimento: 'Ouvi gritos vindo do apartamento ao lado.',
          confiabilidade: 'Média',
          casoCriminal: 'ID caso criminal',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Testemunha atualizada com sucesso',
  })
  async update(
    @Param('id') id: string,
    @Body() updateTestemunhaDto: UpdateTestemunhaDto
  ) {
    const testemunha = await this.testemunhaService.update(id, updateTestemunhaDto);
    if (!testemunha) throw new NotFoundException('Testemunha não encontrada');
    return testemunha;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: 204,
    description: 'Testemunha removida com sucesso',
  })
  async delete(@Param('id') id: string) {
    const result = await this.testemunhaService.delete(id);
    if (!result) throw new NotFoundException('Testemunha não encontrada');
  }
}

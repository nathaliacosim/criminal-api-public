import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { TestemunhaService } from './testemunha.service';
import { Testemunha } from './testemunha.schema';
import { CreateTestemunhaDto } from './create-testemunha.dto';

@ApiTags('testemunha')
@Controller('testemunha')
export class TestemunhaController {
  constructor(private readonly testemunhaService: TestemunhaService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma testemunha' })
  @ApiResponse({ status: 201, description: 'Testemunha criada com sucesso.' })
  @ApiBody({
    description: 'Informações da testemunha para cadastro.',
    type: CreateTestemunhaDto,
    examples: {
      'application/json': {
        value: {
          nome: 'Lucas da Silva',
          contato: '123456789',
        },
      },
    },
  })
  createTestemunha(
    @Body() createTestemunhaDto: CreateTestemunhaDto,
  ): Promise<Testemunha> {
    return this.testemunhaService.createTestemunha(createTestemunhaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todas as testemunhas' })
  @ApiResponse({ status: 200, description: 'Lista de testemunhas.' })
  getAllTestemunhas(): Promise<Testemunha[]> {
    return this.testemunhaService.getAllTestemunhas();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma testemunha pelo ID' })
  @ApiResponse({ status: 200, description: 'Testemunha encontrada.' })
  getTestemunhaById(@Param('id') id: string): Promise<Testemunha> {
    return this.testemunhaService.getTestemunhaById(id);
  }
}

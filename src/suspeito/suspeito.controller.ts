import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SuspeitoService } from './suspeito.service';
import { Suspeito } from './suspeito.schema';
import { CreateSuspeitoDto } from './create-suspeito.dto';

@ApiTags('suspeito')
@Controller('suspeito')
export class SuspeitoController {
  constructor(private readonly suspeitoService: SuspeitoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um suspeito' })
  @ApiResponse({ status: 201, description: 'Suspeito criado com sucesso.' })
  @ApiBody({
    description: 'Informações do suspeito para cadastro.',
    type: CreateSuspeitoDto,
    examples: {
      'application/json': {
        value: {
          nome: 'Pedro da Silva',
          descricao: '5 Passagens por Furto',
        },
      },
    },
  })
  createSuspeito(
    @Body() createSuspeitoDto: CreateSuspeitoDto,
  ): Promise<Suspeito> {
    return this.suspeitoService.createSuspeito(createSuspeitoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todos os suspeitos' })
  @ApiResponse({ status: 200, description: 'Lista de suspeitos.' })
  getAllSuspeitos(): Promise<Suspeito[]> {
    return this.suspeitoService.getAllSuspeitos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um suspeito pelo ID' })
  @ApiResponse({ status: 200, description: 'Suspeito encontrado.' })
  getSuspeitoById(@Param('id') id: string): Promise<Suspeito> {
    return this.suspeitoService.getSuspeitoById(id);
  }
}

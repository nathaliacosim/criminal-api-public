import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { DetetiveService } from './detetive.service';
import { Detetive } from './detetive.schema';
import { CreateDetetiveDto } from './create-detetive.dto';

@ApiTags('detetive')
@Controller('detetive')
export class DetetiveController {
  constructor(private readonly detetiveService: DetetiveService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um detetive' })
  @ApiResponse({ status: 201, description: 'Detetive criado com sucesso.' })
  @ApiBody({
    description: 'Informações do detetive para cadastro.',
    type: CreateDetetiveDto,
    examples: {
      'application/json': {
        value: {
          nome: 'João da Silva',
          especialidade: 'Homicidios',
        },
      },
    },
  })
  createDetetive(
    @Body() createDetetiveDto: CreateDetetiveDto,
  ): Promise<Detetive> {
    return this.detetiveService.createDetetive(createDetetiveDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todos os detetives' })
  @ApiResponse({ status: 200, description: 'Lista de detetives.' })
  getAllDetetives(): Promise<Detetive[]> {
    return this.detetiveService.getAllDetetives();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um detetive pelo ID' })
  @ApiResponse({ status: 200, description: 'Detetive encontrado.' })
  getDetetiveById(@Param('id') id: string): Promise<Detetive> {
    return this.detetiveService.getDetetiveById(id);
  }
}

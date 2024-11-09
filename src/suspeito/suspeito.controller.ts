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
  HttpStatus
} from '@nestjs/common';
import { SuspeitoService } from './suspeito.service';
import { CreateSuspeitoDto } from './create-suspeito.dto';
import { UpdateSuspeitoDto } from './update-suspeito.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Suspeitos') // Adiciona a tag para o Swagger
@Controller('suspeitos')
export class SuspeitoController {
  constructor(private readonly suspeitoService: SuspeitoService) {}

  // POST: Adiciona um novo suspeito
  @Post()
  @ApiBody({
    description: 'Dados para criação de um novo suspeito',
    examples: {
      'application/json': {
        value: {
          nome: "John Doe",
          dataNascimento: "1990-05-15",
          endereco: "123 Main St",
          descricaoFisica: "Alto, cabelos castanhos",
          alibi: "Estava no trabalho",
          relacaoComVitima: "Amigo",
          grauSuspeito: "Primário"
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Suspeito criado com sucesso',
  })
  async create(@Body() createSuspeitoDto: CreateSuspeitoDto) {
    return await this.suspeitoService.create(createSuspeitoDto);
  }

  // GET: Lista todos os suspeitos
  @Get()
  async findAll() {
    return await this.suspeitoService.findAll();
  }

  // GET (by ID): Busca um suspeito por ID
  @Get(':id')
  async findById(@Param('id') id: string) {
    const suspeito = await this.suspeitoService.findById(id);
    if (!suspeito) throw new NotFoundException('Suspeito não encontrado');
    return suspeito;
  }

  // PUT: Atualiza um suspeito por ID
  @Put(':id')
  @ApiBody({
    description: 'Dados para atualização de um suspeito existente',
    examples: {
      'application/json': {
        value: {
          nome: "Jane Doe",
          dataNascimento: "1992-03-20",
          endereco: "456 Another St",
          descricaoFisica: "Baixa estatura, cabelos loiros",
          alibi: "Em casa",
          relacaoComVitima: "Parceiro(a) romântico(a)",
          grauSuspeito: "Secundário"
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Suspeito atualizado com sucesso',
  })
  async update(
    @Param('id') id: string,
    @Body() updateSuspeitoDto: UpdateSuspeitoDto
  ) {
    const suspeito = await this.suspeitoService.update(id, updateSuspeitoDto);
    if (!suspeito) throw new NotFoundException('Suspeito não encontrado');
    return suspeito;
  }

  // DELETE: Remove um suspeito por ID
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: 204,
    description: 'Suspeito removido com sucesso',
  })
  async delete(@Param('id') id: string) {
    const result = await this.suspeitoService.delete(id);
    if (!result) throw new NotFoundException('Suspeito não encontrado');
  }
}

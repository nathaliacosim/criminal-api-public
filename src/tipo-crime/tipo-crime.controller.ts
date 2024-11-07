// src/tipo-crime/tipo-crime.controller.ts
import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { TipoCrimeService } from './tipo-crime.service';
import { CreateTipoCrimeDto } from './create-tipo-crime.dto';
import { TipoCrime } from './tipo-crime.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('tipo-crime')
@Controller('tipo-crime')
export class TipoCrimeController {
  constructor(private readonly tipoCrimeService: TipoCrimeService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todos os tipos de crime' })
  @ApiResponse({ status: 200, description: 'Lista de tipos de crime.' })
  getAllTiposCrime(): Promise<TipoCrime[]> {
    return this.tipoCrimeService.getAllTiposCrime();
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo tipo de crime' })
  @ApiResponse({
    status: 201,
    description: 'Tipo de crime criado com sucesso.',
  })
  @ApiBody({
    description: 'Informações do tipo de crime para cadastro.',
    type: CreateTipoCrimeDto,
    examples: {
      'application/json': {
        value: {
          nome: 'Roubo',
          descricao:
            'Crime caracterizado pelo ato de subtrair bens de uma pessoa, utilizando-se de violência ou grave ameaça. Geralmente envolve o uso de força física para intimidar a vítima.',
        },
      },
    },
  })
  createTipoCrime(
    @Body() createTipoCrimeDto: CreateTipoCrimeDto,
  ): Promise<TipoCrime> {
    return this.tipoCrimeService.createTipoCrime(createTipoCrimeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um tipo de crime' })
  @ApiResponse({
    status: 200,
    description: 'Tipo de crime deletado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de crime não encontrado.',
  })
  async deleteTipoCrime(@Param('id') id: string): Promise<void> {
    await this.tipoCrimeService.deleteTipoCrime(id);
  }
}

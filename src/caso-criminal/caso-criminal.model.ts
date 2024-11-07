import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Suspeito } from '../suspeito/suspeito.schema';
import { Testemunha } from '../testemunha/testemunha.schema';
import { Detetive } from '../detetive/detetive.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Caso extends Document {
  @ApiProperty({ description: 'Nome da vítima do caso' })
  @Prop({ required: true })
  nomeVitima: string;

  @ApiProperty({ description: 'Descrição do crime' })
  @Prop({ required: true })
  descricaoCrime: string;

  @ApiProperty({ description: 'Id do crime' })
  @Prop({ required: true })
  tipoCrimeId: string;

  @ApiProperty({ description: 'Data de abertura do caso' })
  @Prop({ required: true })
  dataAbertura: string;

  @ApiProperty({ description: 'Data de fechamento do caso', nullable: true })
  @Prop()
  dataFechamento?: string;

  @ApiProperty({ description: 'Status do caso' })
  @Prop({ required: true })
  statusCaso: string;

  @ApiProperty({ description: 'Lista de suspeitos', type: [String] })
  @Prop({ type: [{ type: String, ref: 'Suspeito' }] })
  suspeitos: Suspeito[];

  @ApiProperty({ description: 'Lista de testemunhas', type: [String] })
  @Prop({ type: [{ type: String, ref: 'Testemunha' }] })
  testemunhas: Testemunha[];

  @ApiProperty({ description: 'Lista de detetives', type: [String] })
  @Prop({ type: [{ type: String, ref: 'Detetive' }] })
  detetives: Detetive[];
}

export const CasoSchema = SchemaFactory.createForClass(Caso);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Suspeito } from '../suspeito/suspeito.schema';
import { Testemunha } from '../testemunha/testemunha.schema';
import { Detetive } from '../detetive/detetive.schema';
import { Evidencia } from '../evidencia/evidencia.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Caso extends Document {
  @ApiProperty({ description: 'Nome da vítima do caso' })
  @Prop({ required: true })
  nomeVitima: string;

  @ApiProperty({ description: 'Descrição do crime' })
  @Prop({ required: true })
  descricaoCrime: string;

  @ApiProperty({ description: 'ID do tipo de crime' })
  @Prop({ required: true })
  tipoCrimeId: string;

  @ApiProperty({ description: 'Data de abertura do caso' })
  @Prop({ required: true })
  dataAbertura: string;

  @ApiProperty({ description: 'Data de fechamento do caso', nullable: true })
  @Prop()
  dataFechamento?: string | null;

  @ApiProperty({ description: 'Status do caso' })
  @Prop({ required: true })
  statusCaso: string;

  @ApiProperty({
    description: 'Lista de suspeitos relacionados ao caso',
    type: [String],
  })
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Suspeito' }] })
  suspeitos: Suspeito[];

  @ApiProperty({
    description: 'Lista de testemunhas relacionadas ao caso',
    type: [String],
  })
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Testemunha' }] })
  testemunhas: Testemunha[];

  @ApiProperty({
    description: 'Lista de detetives envolvidos no caso',
    type: [String],
  })
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Detetive' }] })
  detetives: Detetive[];

  @ApiProperty({
    description: 'Lista de evidências relacionadas ao caso',
    type: [String],
  })
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Evidencia' }] })
  evidencias: Evidencia[];
}

export const CasoSchema = SchemaFactory.createForClass(Caso);

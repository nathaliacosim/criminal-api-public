import { Schema, Document } from 'mongoose';
import { TipoCrime } from 'src/tipo-crime/tipo-crime.schema';
import { Suspeito } from 'src/suspeito/suspeito.schema';
import { Testemunha } from 'src/testemunha/testemunha.schema';
import { Detetive } from 'src/detetive/detetive.schema';

export const CasoCriminalSchema = new Schema({
  nomeVitima: { type: String, required: true },
  descricaoCrime: { type: String, required: true },
  tipoCrime: {
    type: Schema.Types.ObjectId,
    ref: 'TipoCrime',
    required: true,
  },
  dataAbertura: { type: String, required: true },
  dataFechamento: { type: String },
  statusCaso: {
    type: String,
    enum: ['Aberto', 'Fechado', 'Em Investigação', 'Arquivado', 'Suspenso'],
    required: true,
  },
  suspeitos: [{ type: Schema.Types.ObjectId, ref: 'Suspeito' }],
  testemunhas: [{ type: Schema.Types.ObjectId, ref: 'Testemunha' }],
  detetives: [{ type: Schema.Types.ObjectId, ref: 'Detetive' }],
});

export interface CasoCriminal extends Document {
  nomeVitima: string;
  descricaoCrime: string;
  tipoCrime: TipoCrime;
  dataAbertura: string;
  dataFechamento?: string;
  statusCaso: string;
  suspeitos: Suspeito[];
  testemunhas: Testemunha[];
  detetives: Detetive[];
}

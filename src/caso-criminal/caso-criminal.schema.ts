import { Schema, Document } from 'mongoose';
import { Suspeito } from 'src/suspeito/suspeito.schema';
import { Testemunha } from 'src/testemunha/testemunha.schema';
import { Detetive } from 'src/detetive/detetive.schema';
import { Evidencia } from 'src/evidencia/evidencia.schema';
import { Entrevista } from 'src/entrevista/entrevista.schema';

export const CasoCriminalSchema = new Schema({
  nomeVitima: { type: String, required: true },
  descricaoCrime: { type: String, required: true },
  tipoCrime: {
    type: String,
    enum: [
      'Roubo', 'Furto', 'Homicidio', 'Estupro', 'Tráfico de Drogas', 'Fraude', 'Sequestro', 'Vandalismo', 'Crimes Cibernéticos', 'Perseguição (Stalking)',
      'Assédio Sexual', 'Agressão Física', 'Extorsão', 'Crimes Ambientais', 'Perjúrio', 'Difamação', 'Violência Doméstica', 'Abandono de Incapaz', 'Tráfico Humano'
    ],
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
  evidencias: [{ type: Schema.Types.ObjectId, ref: 'Evidencia' }],
  entrevistas: [{ type: Schema.Types.ObjectId, ref: 'Entrevista' }]
});

export interface CasoCriminal extends Document {
  nomeVitima: string;
  descricaoCrime: string;
  tipoCrime: string;
  dataAbertura: string;
  dataFechamento?: string;
  statusCaso: string;
  suspeitos: Suspeito[];
  testemunhas: Testemunha[];
  detetives: Detetive[];
  evidencias: Evidencia[];
  entrevistas: Entrevista[];
}

import { Schema, Document } from 'mongoose';

export const EntrevistaSchema = new Schema({
  entrevistado: { type: String, required: true },
  tipoEntrevistado: { type: String, required: true },
  tipoEntrevista: {
    type: String,
    enum: ['ONLINE', 'PRESENCIAL'],
    required: true,
  },
  localEntrevista: { type: String, required: true },
  casoCriminal: { type: Schema.Types.ObjectId, ref: 'CasoCriminal', required: true },
  motivoEntrevista: {
    type: String,
    enum: ['Investigação', 'Esclarecimento', 'Depoimento', 'Interrogatório', 'Outros'],
    required: true,
  },
  nomeResponsavel: { type: String, required: true },
  ataEntrevista: { type: String, required: true },
  dataHoraInicio: { type: Date, required: true },
  dataHoraFim: { type: Date, required: true },
});

export interface Entrevista extends Document {
  entrevistado: string;
  tipoEntrevistado: string;
  tipoEntrevista: string;
  localEntrevista: string;
  casoCriminal: string;
  motivoEntrevista: string;
  nomeResponsavel: string;
  ataEntrevista: string;
  dataHoraInicio: Date;
  dataHoraFim: Date;
}

import { Schema, Document } from 'mongoose';

export const SuspeitoSchema = new Schema({
  nome: { type: String, required: true },
  dataNascimento: { type: Date, required: true },
  endereco: { type: String, required: true },
  descricaoFisica: { type: String, required: true },
  alibi: { type: String, required: true },
  relacaoComVitima: { 
    type: String, 
    enum: [
      'Parente', 
      'Amigo', 
      'Colega de trabalho', 
      'Vizinho', 
      'Parceiro(a) romântico(a)', 
      'Antigo parceiro(a)', 
      'Conhecido', 
      'Desconhecido'
    ], 
    required: true 
  },
  grauSuspeito: { 
    type: String, 
    enum: [
      'Primário', 
      'Secundário', 
      'Terciário', 
      'Cúmplice', 
      'Pessoa de interesse'
    ], 
    required: true 
  }
});

export interface Suspeito extends Document {
  nome: string;
  dataNascimento: Date;
  endereco: string;
  descricaoFisica: string;
  alibi: string;
  relacaoComVitima: string;
  grauSuspeito: string;
}

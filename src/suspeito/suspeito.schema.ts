import { Schema, Document } from 'mongoose';

export const SuspeitoSchema = new Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
});

export interface Suspeito extends Document {
  nome: string;
  descricao: string;
}

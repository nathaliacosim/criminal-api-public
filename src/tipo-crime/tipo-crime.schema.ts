import { Schema, Document } from 'mongoose';

export const TipoCrimeSchema = new Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
});

export interface TipoCrime extends Document {
  nome: string;
  descricao: string;
}

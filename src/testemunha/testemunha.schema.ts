import { Schema, Document } from 'mongoose';

export const TestemunhaSchema = new Schema({
  nome: { type: String, required: true },
  contato: { type: String, required: false },
});

export interface Testemunha extends Document {
  nome: string;
  contato?: string;
}

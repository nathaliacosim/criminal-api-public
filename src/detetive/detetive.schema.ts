import { Schema, Document } from 'mongoose';

export const DetetiveSchema = new Schema({
  nome: { type: String, required: true },
  especialidade: { type: String },
});

export interface Detetive extends Document {
  nome: string;
  especialidade?: string;
}

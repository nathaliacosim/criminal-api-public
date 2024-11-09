import { Schema, Document } from 'mongoose';

export const DetetiveSchema = new Schema({
  nome: { type: String, required: true },
  dataNascimento: { type: Date, required: true },
  tipo: { 
    type: String, 
    enum: ['Policial', 'Particular'], 
    required: true 
  },
  patente: { 
    type: String, 
    enum: ['Detetive', 'Detetive de 1ª Classe', 'Investigador Chefe'], 
    required: false 
  },
  especialidade: { 
    type: String, 
    enum: ['Homicídios', 'Fraudes', 'Tráfico de Drogas', 'Roubos', 'Outros'], 
    required: false 
  },
  depoimento: { type: String, required: false },
});

export interface Detetive extends Document {
  nome: string;
  dataNascimento: Date;
  tipo: 'Policial' | 'Particular';
  patente?: 'Detetive' | 'Detetive de 1ª Classe' | 'Investigador Chefe';
  especialidade?: 'Homicídios' | 'Fraudes' | 'Tráfico de Drogas' | 'Roubos' | 'Outros';
  depoimento?: string;
}

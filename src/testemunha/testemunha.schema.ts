import { Schema, Document } from 'mongoose';
import { CasoCriminal } from 'src/caso-criminal/caso-criminal.schema';

export const TestemunhaSchema = new Schema({
  nome: { type: String, required: true },
  dataNascimento: { type: Date, required: true },
  endereco: { type: String, required: true },
  tipoTestemunha: { 
    type: String, 
    enum: ['Ocular', 'Auditiva', 'Especialista', 'Caráter', 'Circunstancial'], 
    required: true 
  },
  alibi: { type: String, required: false },
  relacaoComVitima: { 
    type: String, 
    enum: ['Parente', 'Amigo', 'Colega de trabalho', 'Vizinho', 'Parceiro(a) romântico(a)', 'Antigo parceiro(a)', 'Conhecido', 'Desconhecido'], 
    required: true 
  },
  depoimento: { type: String, required: true },
  confiabilidade: { 
    type: String, 
    enum: ['Alta', 'Média', 'Baixa'], 
    required: true 
  },
  casoCriminal: { 
    type: Schema.Types.ObjectId, 
    ref: 'CasoCriminal', 
    required: false 
  }
});

export interface Testemunha extends Document {
  nome: string;
  dataNascimento: Date;
  endereco: string;
  tipoTestemunha: 'Ocular' | 'Auditiva' | 'Especialista' | 'Caráter' | 'Circunstancial';
  alibi?: string;
  relacaoComVitima: 'Parente' | 'Amigo' | 'Colega de trabalho' | 'Vizinho' | 'Parceiro(a) romântico(a)' | 'Antigo parceiro(a)' | 'Conhecido' | 'Desconhecido';
  depoimento: string;
  confiabilidade: 'Alta' | 'Média' | 'Baixa';
  casoCriminal: CasoCriminal; 
}

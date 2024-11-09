import { Schema, Document } from 'mongoose';
import { Suspeito } from 'src/suspeito/suspeito.schema';
import { Testemunha } from 'src/testemunha/testemunha.schema';
import { Detetive } from 'src/detetive/detetive.schema';

export const CasoCriminalSchema = new Schema({
  nomeVitima: { 
    type: String, 
    required: true,
    trim: true, 
  },
  descricaoCrime: { 
    type: String, 
    required: true, 
    trim: true, 
  },
  tipoCrime: {
    type: String,
    enum: [
      'Roubo', 'Furto', 'Homicidio', 'Estupro', 'Tráfico de Drogas', 'Fraude', 
      'Sequestro', 'Vandalismo', 'Crimes Cibernéticos', 'Perseguição (Stalking)', 
      'Assédio Sexual', 'Agressão Física', 'Extorsão', 'Crimes Ambientais', 'Perjúrio', 
      'Difamação', 'Violência Doméstica', 'Abandono de Incapaz', 'Tráfico Humano'
    ],
    required: true,
  },
  dataAbertura: { 
    type: Date, 
    required: true, 
    default: Date.now,
  },
  dataFechamento: { 
    type: Date, 
  },
  statusCaso: {
    type: String,
    enum: ['Aberto', 'Fechado', 'Em Investigação', 'Arquivado', 'Suspenso'],
    required: true,
  },
  suspeitos: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Suspeito', 
    required: false,
  }],
  testemunhas: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Testemunha', 
    required: false,
  }],
  detetives: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Detetive', 
    required: false,
  }],
});

export interface CasoCriminal extends Document {
  nomeVitima: string;
  descricaoCrime: string;
  tipoCrime: 'Roubo' | 'Furto' | 'Homicidio' | 'Estupro' | 'Tráfico de Drogas' | 
             'Fraude' | 'Sequestro' | 'Vandalismo' | 'Crimes Cibernéticos' | 
             'Perseguição (Stalking)' | 'Assédio Sexual' | 'Agressão Física' | 
             'Extorsão' | 'Crimes Ambientais' | 'Perjúrio' | 'Difamação' | 
             'Violência Doméstica' | 'Abandono de Incapaz' | 'Tráfico Humano';
  dataAbertura: Date;
  dataFechamento?: Date;
  statusCaso: 'Aberto' | 'Fechado' | 'Em Investigação' | 'Arquivado' | 'Suspenso';
  suspeitos: Suspeito[];
  testemunhas: Testemunha[];
  detetives: Detetive[];
}

import { Schema, Document } from 'mongoose';
import { CasoCriminal } from 'src/caso-criminal/caso-criminal.schema';
import { Detetive } from 'src/detetive/detetive.schema';

export const EvidenciaSchema = new Schema({
  casoCriminal: { 
    type: Schema.Types.ObjectId, 
    ref: 'CasoCriminal', 
    required: true 
  },
  tipoEvidencia: { 
    type: String, 
    enum: ['Arma', 'Documento', 'Objeto', 'Material Biológico', 'Áudio', 'Vídeo', 'Outros'],
    required: true 
  },
  descricao: { 
    type: String, 
    required: true, 
    trim: true 
  },
  localizacao: { 
    type: String, 
    required: true, 
    trim: true 
  },
  quemLocalizou: { 
    type: Schema.Types.ObjectId, 
    ref: 'Detetive', 
    required: true 
  },
  dataEncontro: { 
    type: Date, 
    required: true 
  },
  statusEvidencia: {
    type: String,
    enum: ['Boa', 'Ruim', 'Inutilizável'],
    required: true
  },
  observacoes: { 
    type: String, 
    trim: true 
  },
}, {
  timestamps: true,
});

export interface Evidencia extends Document {
  casoCriminal: CasoCriminal;
  tipoEvidencia: 'Arma' | 'Documento' | 'Objeto' | 'Material Biológico' | 'Áudio' | 'Vídeo' | 'Outros';
  descricao: string;
  localizacao: string;
  quemLocalizou: Detetive;
  dataEncontro: Date;
  statusEvidencia: 'Boa' | 'Ruim' | 'Inutilizável';
  observacoes?: string;
}
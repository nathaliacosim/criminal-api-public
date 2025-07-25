import { Module } from '@nestjs/common';
import { CasoCriminalService } from './caso-criminal.service';
import { CasoCriminalController } from './caso-criminal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CasoCriminalSchema } from './caso-criminal.schema';
import { SuspeitoSchema } from 'src/suspeito/suspeito.schema';
import { TestemunhaSchema } from 'src/testemunha/testemunha.schema';
import { DetetiveSchema } from 'src/detetive/detetive.schema';
import { EvidenciaSchema } from 'src/evidencia/evidencia.schema';
import { EntrevistaSchema } from 'src/entrevista/entrevista.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CasoCriminal', schema: CasoCriminalSchema },
      { name: 'Suspeito', schema: SuspeitoSchema },
      { name: 'Testemunha', schema: TestemunhaSchema },
      { name: 'Detetive', schema: DetetiveSchema },
      { name: 'Evidencia', schema: EvidenciaSchema },
      { name: 'Entrevista', schema: EntrevistaSchema  },
    ]),
  ],
  providers: [CasoCriminalService],
  controllers: [CasoCriminalController],
})
export class CasoCriminalModule {}

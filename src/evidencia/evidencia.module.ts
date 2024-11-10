import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EvidenciaController } from './evidencia.controller';
import { EvidenciaService } from './evidencia.service';
import { EvidenciaSchema } from './evidencia.schema';
import { CasoCriminalSchema } from 'src/caso-criminal/caso-criminal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Evidencia', schema: EvidenciaSchema },      
      { name: 'CasoCriminal', schema: CasoCriminalSchema }
    ]),
  ],
  controllers: [EvidenciaController],
  providers: [EvidenciaService],
})
export class EvidenciaModule {}

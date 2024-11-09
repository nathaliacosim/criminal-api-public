import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EvidenciaController } from './evidencia.controller';
import { EvidenciaService } from './evidencia.service';
import { EvidenciaSchema } from './evidencia.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Evidencia', schema: EvidenciaSchema }]),
  ],
  controllers: [EvidenciaController],
  providers: [EvidenciaService],
})
export class EvidenciaModule {}

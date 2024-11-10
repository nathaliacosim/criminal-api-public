import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntrevistaService } from './entrevista.service';
import { EntrevistaController } from './entrevista.controller';
import { EntrevistaSchema } from './entrevista.schema';
import { CasoCriminalSchema } from 'src/caso-criminal/caso-criminal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Entrevista', schema: EntrevistaSchema },      
      { name: 'CasoCriminal', schema: CasoCriminalSchema }
    ]),
  ],
  controllers: [EntrevistaController],
  providers: [EntrevistaService],
  exports: [EntrevistaService],
})
export class EntrevistaModule {}
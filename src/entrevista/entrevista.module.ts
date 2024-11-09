import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntrevistaService } from './entrevista.service';
import { EntrevistaController } from './entrevista.controller';
import { EntrevistaSchema } from './entrevista.schema';
import { CasoCriminalModule } from '../caso-criminal/caso-criminal.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Entrevista', schema: EntrevistaSchema }]),
    CasoCriminalModule,
  ],
  controllers: [EntrevistaController],
  providers: [EntrevistaService],
  exports: [EntrevistaService],
})
export class EntrevistaModule {}

// src/caso-criminal/caso-criminal.module.ts
import { Module } from '@nestjs/common';
import { CasoCriminalController } from './caso-criminal.controller';
import { CasoCriminalService } from './caso-criminal.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CasoCriminalSchema } from './caso-criminal.schema';
import { TipoCrimeModule } from 'src/tipo-crime/tipo-crime.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CasoCriminal', schema: CasoCriminalSchema },
    ]),
    TipoCrimeModule,
  ],
  controllers: [CasoCriminalController],
  providers: [CasoCriminalService],
})
export class CasoCriminalModule {}

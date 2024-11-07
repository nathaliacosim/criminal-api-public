// src/tipo-crime/tipo-crime.module.ts
import { Module } from '@nestjs/common';
import { TipoCrimeController } from './tipo-crime.controller';
import { TipoCrimeService } from './tipo-crime.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoCrimeSchema } from './tipo-crime.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'TipoCrime', schema: TipoCrimeSchema }]),
  ],
  controllers: [TipoCrimeController],
  providers: [TipoCrimeService],
  exports: [TipoCrimeService],
})
export class TipoCrimeModule {}

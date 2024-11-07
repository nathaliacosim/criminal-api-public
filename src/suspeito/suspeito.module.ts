import { Module } from '@nestjs/common';
import { SuspeitoController } from './suspeito.controller';
import { SuspeitoService } from './suspeito.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SuspeitoSchema } from './suspeito.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Suspeito', schema: SuspeitoSchema }]),
  ],
  controllers: [SuspeitoController],
  providers: [SuspeitoService],
})
export class SuspeitoModule {}

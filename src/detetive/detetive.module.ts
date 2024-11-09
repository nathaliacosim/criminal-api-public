import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DetetiveController } from './detetive.controller';
import { DetetiveService } from './detetive.service';
import { Detetive, DetetiveSchema } from './detetive.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Detetive', schema: DetetiveSchema }]),
  ],
  controllers: [DetetiveController],
  providers: [DetetiveService],
})
export class DetetiveModule {}

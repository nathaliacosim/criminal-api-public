import { Module } from '@nestjs/common';
import { DetetiveController } from './detetive.controller';
import { DetetiveService } from './detetive.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DetetiveSchema } from './detetive.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Detetive', schema: DetetiveSchema }]),
  ],
  controllers: [DetetiveController],
  providers: [DetetiveService],
})
export class DetetiveModule {}

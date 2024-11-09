import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestemunhaController } from './testemunha.controller';
import { TestemunhaService } from './testemunha.service';
import { TestemunhaSchema } from './testemunha.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Testemunha', schema: TestemunhaSchema },
    ]),
  ],
  controllers: [TestemunhaController],
  providers: [TestemunhaService],
})
export class TestemunhaModule {}

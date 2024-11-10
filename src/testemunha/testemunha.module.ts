import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestemunhaController } from './testemunha.controller';
import { TestemunhaService } from './testemunha.service';
import { TestemunhaSchema } from './testemunha.schema';
import { CasoCriminalSchema } from 'src/caso-criminal/caso-criminal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Testemunha', schema: TestemunhaSchema },
      { name: 'CasoCriminal', schema: CasoCriminalSchema },
    ]),
  ],
  controllers: [TestemunhaController],
  providers: [TestemunhaService],
})
export class TestemunhaModule {}

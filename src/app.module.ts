import * as dotenv from 'dotenv';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CorsMiddleware } from './cors.middleware';
import { CasoCriminalModule } from './caso-criminal/caso-criminal.module';
import { TipoCrimeModule } from './tipo-crime/tipo-crime.module';
import { SuspeitoModule } from './suspeito/suspeito.module';
import { TestemunhaModule } from './testemunha/testemunha.module';
import { DetetiveModule } from './detetive/detetive.module';

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

if (!dbUser || !dbPassword) {
  throw new Error(
    'Variáveis de ambiente DB_USER ou DB_PASSWORD não definidas.',
  );
}

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'uploads'),
      serveRoot: '/api/uploads/',
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${dbUser}:${dbPassword}@criminalcluster.a4xg1.mongodb.net/?retryWrites=true&w=majority&appName=CriminalCluster`,
    ),
    CasoCriminalModule,
    TipoCrimeModule,
    SuspeitoModule,
    TestemunhaModule,
    DetetiveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}

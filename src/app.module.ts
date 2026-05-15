import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExemploModule } from './exemplo/exemplo.module';

@Module({
  imports: [
    ExemploModule,
    MongooseModule.forRoot(
      'mongodb://localhost:27017/test',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

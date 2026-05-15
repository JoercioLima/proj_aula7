import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExemploController } from './exemplo.controller';
import { ExemploService } from './exemplo.service';
import { Pratica, PraticaSchema } from './exemplo.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pratica.name, schema: PraticaSchema }]),
  ],
  controllers: [ExemploController],
  providers: [ExemploService],
})
export class ExemploModule {}

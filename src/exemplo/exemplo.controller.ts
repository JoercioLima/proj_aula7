import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ExemploService } from './exemplo.service';

@Controller()
export class ExemploController {
  constructor(private readonly service: ExemploService) {}
  @Post('pratica')
  criar(@Body() body: any) {
    return this.service.criar(body);
  }
  @Get('historico')
  listar(
    @Query('nomeUsuario') nomeUsuario?: string,
    @Query('tipo') tipo?: string,
    @Query('dataInicial') dataInicial?: string,
    @Query('dataFinal') dataFinal?: string,
  ) {
    return this.service.listar(nomeUsuario, tipo, dataInicial, dataFinal);
  }
  @Get('estatisticas')
  estatisticas() {
    return this.service.estatisticas();
  }
}

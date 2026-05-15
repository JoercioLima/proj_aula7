import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pratica, PraticaDocument } from './exemplo.model';

@Injectable()
export class ExemploService {
  constructor(
    @InjectModel(Pratica.name)
    private praticaModel: Model<PraticaDocument>,
  ) {}
  async criar(dados: any) {
    return this.praticaModel.create(dados);
  }
  async listar(nomeUsuario?: string, tipo?: string, dataInicial?: string, dataFinal?: string) {
    const filtro: any = {};
    if (nomeUsuario) {
      filtro.nomeUsuario = nomeUsuario;
    }
    if (tipo) {
      filtro.tipo = tipo;
    }
    if (dataInicial || dataFinal) {
      filtro.data = {};
      if (dataInicial) {
        filtro.data.$gte = dataInicial;
      }
      if (dataFinal) {
        filtro.data.$lte = dataFinal;
      }
    }
    return this.praticaModel.find(filtro);
  }
  async estatisticas() {
    const praticas = await this.praticaModel.find();
    const totalGeral = praticas.length;
    const totalPorTipo: any = {};
    const totalPorUsuario: any = {};
    praticas.forEach((p) => {
      totalPorTipo[p.tipo] = (totalPorTipo[p.tipo] || 0) + 1;
      totalPorUsuario[p.nomeUsuario] =
        (totalPorUsuario[p.nomeUsuario] || 0) + 1;
    });
    const tipoMaisRegistrado = Object.keys(totalPorTipo).reduce((a, b) =>
      totalPorTipo[a] > totalPorTipo[b] ? a : b,
    );
    const usuarioMaisAtivo = Object.keys(totalPorUsuario).reduce((a, b) =>
      totalPorUsuario[a] > totalPorUsuario[b] ? a : b,
    );
    const mediaDiaria = totalGeral / 30;
    return {
      tipoMaisRegistrado,
      usuarioMaisAtivo,
      totalPorTipo,
      totalGeral,
      mediaDiaria,
    };
  }
}

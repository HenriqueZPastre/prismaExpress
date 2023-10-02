"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerValores = void 0;
const client_1 = require("@prisma/client");
const HandleResponse_1 = require("../utils/HandleResponse/HandleResponse");
const prisma = new client_1.PrismaClient();
exports.controllerValores = {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const despesas = yield prisma.lancamentos.findMany({
                select: {
                    id: true,
                    descricao: true,
                    valor: true,
                },
                where: {
                    deletede_at: null,
                    dataPagamento: null,
                    tipo: 1,
                    situacao: 0
                }
            });
            const saldoAtual = yield prisma.contas.findMany({
                select: {
                    saldoAtual: true,
                    nome: true,
                    id: true
                },
                where: {
                    deletede_at: null,
                }
            });
            let despesasTotal = 0;
            despesas.forEach((item) => {
                despesasTotal += item.valor;
            });
            let atual = 0;
            saldoAtual.forEach((item) => {
                atual += item.saldoAtual;
            });
            const valorLiquido = atual - despesasTotal;
            const t = {
                Despesas: despesas, Contas: saldoAtual, total: {
                    despesas: despesasTotal,
                    SaldoAtual: atual,
                    liquido: valorLiquido
                }
            };
            return HandleResponse_1.HandleResponse.main(res, 200, { data: t });
        });
    }
};

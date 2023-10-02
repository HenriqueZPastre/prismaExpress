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
exports.CONTAS = void 0;
const client_1 = require("@prisma/client");
const HandleResponse_1 = require("../utils/HandleResponse/HandleResponse");
const zod_1 = require("zod");
const erroGenerico_1 = require("../utils/HandleResponse/erroGenerico");
const Paginator_1 = require("../utils/Paginator/Paginator");
const contas_1 = require("../models/contas/contas");
const prisma = new client_1.PrismaClient();
exports.CONTAS = {
    listAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, take } = Paginator_1.Paginator.main(_req.query);
            const all = yield prisma.contas.findMany({
                select: {
                    id: true,
                    nome: true,
                    saldoInicial: true,
                    saldoAtual: true,
                },
                where: {
                    deletede_at: null
                },
                take: take,
                skip: skip,
            });
            try {
                contas_1.zodContas.listar.parse(all);
            }
            catch (err) {
                if (err instanceof zod_1.ZodError) {
                    return HandleResponse_1.HandleResponse.main(res, 400, { zod: err });
                }
                return HandleResponse_1.HandleResponse.main(res, 400, { erro: err });
            }
            if (all.length < 1) {
                return HandleResponse_1.HandleResponse.main(res, 404, { mensagem: 'Nenhuma conta encontrada' });
            }
            return HandleResponse_1.HandleResponse.main(res, 200, { data: all });
        });
    },
    createConta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome, saldoInicial, saldoAtual, codigoBanco } = contas_1.zodContas.create.parse(req.body);
                const create = yield prisma.contas.create({
                    data: {
                        codigoBanco: codigoBanco,
                        nome: nome,
                        saldoInicial: saldoInicial || 0,
                        saldoAtual: saldoAtual || 0
                    }
                });
                return HandleResponse_1.HandleResponse.main(res, 201, { data: create.id.toString() });
            }
            catch (err) {
                if (err instanceof zod_1.ZodError) {
                    return HandleResponse_1.HandleResponse.main(res, 400, { zod: err });
                }
                return HandleResponse_1.HandleResponse.main(res, 400, { erro: err });
            }
        });
    },
    deleteConta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const selectConta = yield prisma.contas.findFirst({
                where: {
                    id: id,
                    deletede_at: null,
                },
            });
            const verificarLancamentosVinculados = yield prisma.lancamentos.findFirst({
                where: {
                    contasId: id,
                    deletede_at: null,
                }
            });
            if (!selectConta) {
                return HandleResponse_1.HandleResponse.main(res, 404, { erro: 'Conta não encontrada' });
            }
            if (verificarLancamentosVinculados) {
                return HandleResponse_1.HandleResponse.main(res, 400, { mensagem: 'Conta não pode ser excluida pois possui vinculo com outros dados do banco' });
            }
            yield prisma.contas.update({
                data: {
                    deletede_at: new Date()
                },
                where: {
                    id: id
                }
            });
            return HandleResponse_1.HandleResponse.main(res, 204);
        });
    },
    editarConta(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const { nome, saldoInicial } = contas_1.zodContas.editar.parse(req.body);
                if (!nome && !saldoInicial) {
                    return HandleResponse_1.HandleResponse.main(resp, 400, { erro: 'Nenhum dado foi informado para edição' });
                }
                yield prisma.contas.update({
                    data: {
                        nome: nome,
                        saldoInicial: saldoInicial
                    },
                    where: {
                        id: id,
                    },
                });
            }
            catch (err) {
                if (err instanceof zod_1.ZodError) {
                    return HandleResponse_1.HandleResponse.main(resp, 400, { zod: err });
                }
                return HandleResponse_1.HandleResponse.main(resp, 500, { erro: 'Não foi possível editar a conta' });
            }
            return HandleResponse_1.HandleResponse.main(resp, 204);
        });
    },
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const conta = yield prisma.contas.findFirst({
                select: {
                    id: true,
                    nome: true,
                    saldoInicial: true,
                    saldoAtual: true,
                },
                where: {
                    id: id,
                    deletede_at: null
                }
            });
            if (!conta) {
                return HandleResponse_1.HandleResponse.main(res, 404, { erro: 'Conta não encontrada' });
            }
            return HandleResponse_1.HandleResponse.main(res, 200, { data: conta });
        });
    },
    contaExiste: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const conta = yield prisma.contas.findFirst({
            where: {
                id: id,
                deletede_at: null
            }
        });
        if (!conta) {
            throw erroGenerico_1.ErrorGenerico.main('Conta não encontrada');
        }
        return conta;
    }),
    atualizarSaldo: (lancamentos) => __awaiter(void 0, void 0, void 0, function* () {
        const select = {
            saldoAtual: true,
            id: true,
            nome: true,
            saldoInicial: true,
        };
        if (lancamentos.situacao === 1) {
            let atualizaValor;
            if (lancamentos.tipo === 0) {
                atualizaValor = yield prisma.contas.update({
                    select: select,
                    where: {
                        id: lancamentos.contasId
                    },
                    data: {
                        saldoAtual: {
                            increment: lancamentos.valor
                        }
                    }
                });
            }
            else {
                atualizaValor = yield prisma.contas.update({
                    select: select,
                    where: {
                        id: lancamentos.contasId
                    },
                    data: {
                        saldoAtual: {
                            decrement: lancamentos.valor
                        }
                    }
                });
            }
            return atualizaValor;
        }
        return undefined;
    })
};

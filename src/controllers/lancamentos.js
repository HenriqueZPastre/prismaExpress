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
exports.LancamentosController = void 0;
const client_1 = require("@prisma/client");
const HandleResponse_1 = require("../utils/HandleResponse/HandleResponse");
const zod_1 = require("zod");
const contas_1 = require("./contas");
const tags_1 = require("./tags/tags");
const binary_1 = require("@prisma/client/runtime/binary");
const Paginator_1 = require("../utils/Paginator/Paginator");
const lancamentos_1 = require("../models/lancamentos/lancamentos");
const prisma = new client_1.PrismaClient();
exports.LancamentosController = {
    listAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { skip, take, order, colunaParaOrdenacao } = Paginator_1.Paginator.main(req.query);
            const lancamentos = yield prisma.lancamentos.findMany({
                select: {
                    id: true,
                    descricao: true,
                    valor: true,
                    dataVencimento: true,
                    dataPagamento: true,
                    tipo: true,
                    contasNome: true,
                    situacao: true,
                    lancamentos_tags: {
                        select: {
                            tags: {
                                select: {
                                    nome: true,
                                    id: true,
                                }
                            },
                        },
                        where: {
                            deletede_at: null
                        }
                    },
                },
                where: {
                    deletede_at: null
                },
                orderBy: colunaParaOrdenacao ? colunaParaOrdenacao : {
                    id: order || 'desc'
                },
                skip: skip,
                take: take,
            });
            if (lancamentos.length < 1) {
                return HandleResponse_1.HandleResponse.main(res, 404, { mensagem: 'Nenhum lançamento encontrado' });
            }
            return HandleResponse_1.HandleResponse.main(res, 200, { data: lancamentos });
        });
    },
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { descricao, valor, dataVencimento, dataPagamento, tipo, contasId, tagsId } = lancamentos_1.zodLancamentos.create.parse(req.body);
                const conta = yield contas_1.CONTAS.contaExiste(contasId);
                const dataAtual = new Date();
                let situacao = req.body.situacao;
                if (dataPagamento !== undefined && new Date(dataPagamento) <= dataAtual && situacao === undefined) {
                    situacao = 1; //fechada
                }
                let tags = undefined;
                tagsId != undefined ? tags = yield tags_1.ControllerTags.verificarSeTagExiste(tagsId) : tags = undefined;
                const lancamentos = yield prisma.lancamentos.create({
                    select: {
                        id: true,
                        descricao: true,
                        valor: true,
                        dataVencimento: true,
                        dataPagamento: true,
                        tipo: true,
                        contasNome: true,
                        contasId: true,
                        situacao: true,
                        lancamentos_tags: {
                            select: {
                                tags: {
                                    select: {
                                        id: true,
                                        nome: true,
                                    }
                                }
                            }
                        }
                    },
                    data: {
                        descricao: descricao,
                        valor: valor,
                        dataVencimento: dataVencimento,
                        dataPagamento: dataPagamento,
                        tipo: tipo,
                        contasId: conta.id,
                        contasNome: conta.nome,
                        situacao: situacao,
                        lancamentos_tags: {
                            create: tags === null || tags === void 0 ? void 0 : tags.map((tag) => {
                                return {
                                    tags: {
                                        connect: {
                                            id: tag.id
                                        }
                                    }
                                };
                            })
                        },
                    }
                });
                const atualizaValor = yield contas_1.CONTAS.atualizarSaldo(lancamentos);
                if (atualizaValor) {
                    return HandleResponse_1.HandleResponse.main(res, 201, { data: lancamentos, extras: atualizaValor });
                }
                return HandleResponse_1.HandleResponse.main(res, 201, { data: lancamentos, });
            }
            catch (err) {
                if (err instanceof zod_1.ZodError) {
                    return HandleResponse_1.HandleResponse.main(res, 400, { zod: err, extras: err });
                }
                if (err instanceof Error) {
                    return HandleResponse_1.HandleResponse.main(res, 500, { mensagem: err.message });
                }
                if (err instanceof binary_1.PrismaClientKnownRequestError) {
                    return HandleResponse_1.HandleResponse.main(res, 400, { mensagem: err.message });
                }
                return HandleResponse_1.HandleResponse.main(res, 500, { mensagem: err });
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const lancamento = yield prisma.lancamentos.update({
                    data: {
                        deletede_at: new Date(),
                        lancamentos_tags: {
                            updateMany: {
                                data: {
                                    deletede_at: new Date()
                                },
                                where: {
                                    lancamentosId: id
                                }
                            }
                        }
                    },
                    where: {
                        id: id
                    }
                });
                if (lancamento.situacao === 1) {
                    lancamento.tipo === 0 ? lancamento.tipo = 1 : lancamento.tipo = 0;
                    const atualizaValor = yield contas_1.CONTAS.atualizarSaldo(lancamento);
                    if (atualizaValor) {
                        return HandleResponse_1.HandleResponse.main(res, 200, { mensagem: 'Lançamento deletado com sucesso', extras: atualizaValor });
                    }
                }
            }
            catch (err) {
                if (err instanceof zod_1.ZodError) {
                    return HandleResponse_1.HandleResponse.main(res, 400, { zod: err, extras: err });
                }
                return HandleResponse_1.HandleResponse.main(res, 500, { mensagem: err });
            }
            return HandleResponse_1.HandleResponse.main(res, 200, { mensagem: 'Lançamento deletado com sucesso' });
        });
    },
    update(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const validaBody = lancamentos_1.zodLancamentos.editar.parse(req.body);
                const update = yield prisma.lancamentos.update({
                    data: {
                        descricao: validaBody.descricao,
                        valor: validaBody.valor,
                        dataVencimento: validaBody.dataVencimento,
                        dataPagamento: validaBody.dataPagamento,
                        tipo: validaBody.tipo,
                        situacao: validaBody.situacao,
                        lancamentos_tags: {
                            updateMany: {
                                data: {
                                    deletede_at: new Date()
                                },
                                where: {
                                    deletede_at: null,
                                    NOT: {
                                        tagsId: {
                                            in: validaBody.tags
                                        }
                                    }
                                },
                            },
                        }
                    },
                    where: {
                        id: id
                    }
                });
                if (validaBody.situacao !== undefined) {
                    yield contas_1.CONTAS.atualizarSaldo(update);
                }
                (_a = validaBody.tags) === null || _a === void 0 ? void 0 : _a.map((tag) => __awaiter(this, void 0, void 0, function* () {
                    const existe = yield prisma.lancamentos_tags.findFirst({
                        where: {
                            lancamentosId: id,
                            tagsId: tag,
                            deletede_at: null
                        }
                    });
                    if (!existe) {
                        yield prisma.lancamentos_tags.create({
                            data: {
                                lancamentosId: id,
                                tagsId: tag
                            }
                        });
                    }
                }));
                return HandleResponse_1.HandleResponse.main(res, 200, { data: update });
            }
            catch (err) {
                if (err instanceof zod_1.ZodError) {
                    return HandleResponse_1.HandleResponse.main(res, 400, { zod: err, extras: err });
                }
                return HandleResponse_1.HandleResponse.main(res, 500, { mensagem: err });
            }
        });
    },
    getId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const lancamentos = yield prisma.lancamentos.findFirst({
                where: {
                    id: id,
                    deletede_at: null
                },
                select: {
                    id: true,
                    descricao: true,
                    valor: true,
                    dataVencimento: true,
                    dataPagamento: true,
                    tipo: true,
                    contasId: true,
                    contasNome: true,
                    situacao: true,
                    lancamentos_tags: {
                        select: {
                            tags: {
                                select: {
                                    id: true,
                                    nome: true,
                                }
                            }
                        }
                    }
                }
            });
            if (!lancamentos) {
                return HandleResponse_1.HandleResponse.main(res, 404, { mensagem: 'Lançamento não encontrado' });
            }
            return HandleResponse_1.HandleResponse.main(res, 200, { data: lancamentos });
        });
    }
};

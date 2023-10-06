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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LancamentosController = void 0;
var client_1 = require("@prisma/client");
var HandleResponse_1 = require("../utils/HandleResponse/HandleResponse");
var zod_1 = require("zod");
var contas_1 = require("./contas");
var tags_1 = require("./tags/tags");
var binary_1 = require("@prisma/client/runtime/binary");
var Paginator_1 = require("../utils/Paginator/Paginator");
var lancamentos_1 = require("@models/lancamentos/lancamentos");
var prisma = new client_1.PrismaClient();
exports.LancamentosController = {
    listAll: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, skip, take, order, colunaParaOrdenacao, lancamentos;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Paginator_1.Paginator.main(req.query), skip = _a.skip, take = _a.take, order = _a.order, colunaParaOrdenacao = _a.colunaParaOrdenacao;
                        return [4 /*yield*/, prisma.lancamentos.findMany({
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
                            })];
                    case 1:
                        lancamentos = _b.sent();
                        if (lancamentos.length < 1) {
                            return [2 /*return*/, HandleResponse_1.HandleResponse.main(res, 404, { mensagem: 'Nenhum lançamento encontrado' })];
                        }
                        return [2 /*return*/, HandleResponse_1.HandleResponse.main(res, 200, { data: lancamentos })];
                }
            });
        });
    },
    create: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, descricao, valor, dataVencimento, dataPagamento, tipo, contasId, tagsId, conta, dataAtual, situacao, tags, _b, lancamentos, atualizaValor, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 7, , 8]);
                        _a = lancamentos_1.zodLancamentos.create.parse(req.body), descricao = _a.descricao, valor = _a.valor, dataVencimento = _a.dataVencimento, dataPagamento = _a.dataPagamento, tipo = _a.tipo, contasId = _a.contasId, tagsId = _a.tagsId;
                        return [4 /*yield*/, contas_1.CONTAS.contaExiste(contasId)];
                    case 1:
                        conta = _c.sent();
                        dataAtual = new Date();
                        situacao = req.body.situacao;
                        if (dataPagamento !== undefined && new Date(dataPagamento) <= dataAtual && situacao === undefined) {
                            situacao = 1; //fechada
                        }
                        tags = undefined;
                        if (!(tagsId != undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, tags_1.ControllerTags.verificarSeTagExiste(tagsId)];
                    case 2:
                        _b = tags = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _b = tags = undefined;
                        _c.label = 4;
                    case 4:
                        _b;
                        return [4 /*yield*/, prisma.lancamentos.create({
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
                                        create: tags === null || tags === void 0 ? void 0 : tags.map(function (tag) {
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
                            })];
                    case 5:
                        lancamentos = _c.sent();
                        return [4 /*yield*/, contas_1.CONTAS.atualizarSaldo(lancamentos)];
                    case 6:
                        atualizaValor = _c.sent();
                        if (atualizaValor) {
                            return [2 /*return*/, HandleResponse_1.HandleResponse.main(res, 201, { data: lancamentos, extras: atualizaValor })];
                        }
                        return [2 /*return*/, HandleResponse_1.HandleResponse.main(res, 201, { data: lancamentos, })];
                    case 7:
                        err_1 = _c.sent();
                        if (err_1 instanceof zod_1.ZodError) {
                            return [2 /*return*/, HandleResponse_1.HandleResponse.main(res, 400, { zod: err_1, extras: err_1 })];
                        }
                        if (err_1 instanceof Error) {
                            return [2 /*return*/, HandleResponse_1.HandleResponse.main(res, 500, { mensagem: err_1.message })];
                        }
                        if (err_1 instanceof binary_1.PrismaClientKnownRequestError) {
                            return [2 /*return*/, HandleResponse_1.HandleResponse.main(res, 400, { mensagem: err_1.message })];
                        }
                        return [2 /*return*/, HandleResponse_1.HandleResponse.main(res, 500, { mensagem: err_1 })];
                    case 8: return [2 /*return*/];
                }
            });
        });
    },
    delete: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, lancamento, atualizaValor, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = parseInt(req.params.id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, prisma.lancamentos.update({
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
                            })];
                    case 2:
                        lancamento = _a.sent();
                        if (!(lancamento.situacao === 1)) return [3 /*break*/, 4];
                        lancamento.tipo === 0 ? lancamento.tipo = 1 : lancamento.tipo = 0;
                        return [4 /*yield*/, contas_1.CONTAS.atualizarSaldo(lancamento)];
                    case 3:
                        atualizaValor = _a.sent();
                        if (atualizaValor) {
                            return [2 /*return*/, HandleResponse_1.HandleResponse.main(res, 200, { mensagem: 'Lançamento deletado com sucesso', extras: atualizaValor })];
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        if (err_2 instanceof zod_1.ZodError) {
                            return [2 /*return*/, HandleResponse_1.HandleResponse.main(res, 400, { zod: err_2, extras: err_2 })];
                        }
                        return [2 /*return*/, HandleResponse_1.HandleResponse.main(res, 500, { mensagem: err_2 })];
                    case 6: return [2 /*return*/, HandleResponse_1.HandleResponse.main(res, 200, { mensagem: 'Lançamento deletado com sucesso' })];
                }
            });
        });
    },
    update: function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var id, validaBody, update, err_3;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = parseInt(req.params.id);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        validaBody = lancamentos_1.zodLancamentos.editar.parse(req.body);
                        return [4 /*yield*/, prisma.lancamentos.update({
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
                            })];
                    case 2:
                        update = _b.sent();
                        if (!(validaBody.situacao !== undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, contas_1.CONTAS.atualizarSaldo(update)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        (_a = validaBody.tags) === null || _a === void 0 ? void 0 : _a.map(function (tag) { return __awaiter(_this, void 0, void 0, function () {
                            var existe;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, prisma.lancamentos_tags.findFirst({
                                            where: {
                                                lancamentosId: id,
                                                tagsId: tag,
                                                deletede_at: null
                                            }
                                        })];
                                    case 1:
                                        existe = _a.sent();
                                        if (!!existe) return [3 /*break*/, 3];
                                        return [4 /*yield*/, prisma.lancamentos_tags.create({
                                                data: {
                                                    lancamentosId: id,
                                                    tagsId: tag
                                                }
                                            })];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/, HandleResponse_1.HandleResponse.main(res, 200, { data: update })];
                    case 5:
                        err_3 = _b.sent();
                        if (err_3 instanceof zod_1.ZodError) {
                            return [2 /*return*/, HandleResponse_1.HandleResponse.main(res, 400, { zod: err_3, extras: err_3 })];
                        }
                        return [2 /*return*/, HandleResponse_1.HandleResponse.main(res, 500, { mensagem: err_3 })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    getId: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, lancamentos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = parseInt(req.params.id);
                        return [4 /*yield*/, prisma.lancamentos.findFirst({
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
                            })];
                    case 1:
                        lancamentos = _a.sent();
                        if (!lancamentos) {
                            return [2 /*return*/, HandleResponse_1.HandleResponse.main(res, 404, { mensagem: 'Lançamento não encontrado' })];
                        }
                        return [2 /*return*/, HandleResponse_1.HandleResponse.main(res, 200, { data: lancamentos })];
                }
            });
        });
    }
};

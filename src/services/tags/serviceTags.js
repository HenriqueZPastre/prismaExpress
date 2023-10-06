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
exports.serviceTags = void 0;
var Paginator_1 = require("../../utils/Paginator/Paginator");
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var ServiceTags = /** @class */ (function () {
    function ServiceTags() {
    }
    ServiceTags.prototype.listarTodas = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, take, skip, colunaParaOrdenacao, order, consulta, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = Paginator_1.Paginator.main(params), take = _a.take, skip = _a.skip, colunaParaOrdenacao = _a.colunaParaOrdenacao, order = _a.order;
                        return [4 /*yield*/, prisma.tags.findMany({
                                select: {
                                    id: true,
                                    nome: true,
                                },
                                where: {
                                    deletede_at: null
                                },
                                take: take,
                                skip: skip,
                                orderBy: colunaParaOrdenacao ? colunaParaOrdenacao : {
                                    id: order || 'desc'
                                }
                            })];
                    case 1:
                        consulta = _b.sent();
                        return [2 /*return*/, { consulta: consulta, erro: null }];
                    case 2:
                        error_1 = _b.sent();
                        return [2 /*return*/, { consulta: null, erro: error_1 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceTags.prototype.deletar = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma.tags.update({
                                data: {
                                    deletede_at: new Date()
                                },
                                where: {
                                    id: id,
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { error: undefined }];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, { error: error_2 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceTags.prototype.criar = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var tag, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma.tags.create({
                                select: {
                                    nome: true,
                                    id: true,
                                },
                                data: {
                                    nome: params.nome
                                }
                            })];
                    case 1:
                        tag = _a.sent();
                        return [2 /*return*/, { resultado: tag, erro: null }];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, { resultado: null, erro: error_3 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceTags.prototype.editar = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var update, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma.tags.update({
                                select: {
                                    id: true,
                                    nome: true
                                },
                                data: {
                                    nome: params.nome
                                },
                                where: {
                                    id: params.id
                                }
                            })];
                    case 1:
                        update = _a.sent();
                        return [2 /*return*/, { resultado: update, erro: null }];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, { resultado: null, erro: error_4 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceTags.prototype.buscarPorId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var tag, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma.tags.findFirst({
                                select: {
                                    id: true,
                                    nome: true,
                                },
                                where: {
                                    id: id,
                                    deletede_at: null
                                }
                            })];
                    case 1:
                        tag = _a.sent();
                        return [2 /*return*/, { resultado: tag, erro: null }];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, { resultado: null, erro: error_5 }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceTags.prototype.verificarSeTagExiste = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var numeroDeLancamentos, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, prisma.tags.count({
                                where: {
                                    id: id,
                                    deletede_at: null
                                }
                            })];
                    case 1:
                        numeroDeLancamentos = _a.sent();
                        return [2 /*return*/, { existe: numeroDeLancamentos > 0 ? true : false, erro: null }];
                    case 2:
                        error_6 = _a.sent();
                        console.error('aaa', error_6);
                        return [2 /*return*/, { existe: null, erro: new Error(String(error_6)) }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServiceTags.prototype.verificarAsociacoesDeTag = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var numeroDeLancamentos, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, prisma.tags.findFirstOrThrow({
                                where: {
                                    id: id,
                                    deletede_at: null
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, prisma.lancamentos_tags.count({
                                where: {
                                    tagsId: id,
                                    deletede_at: null,
                                    tags: {
                                        deletede_at: null
                                    }
                                }
                            })];
                    case 2:
                        numeroDeLancamentos = _a.sent();
                        return [2 /*return*/, { qnt: numeroDeLancamentos, erro: null }];
                    case 3:
                        error_7 = _a.sent();
                        return [2 /*return*/, { qnt: null, erro: error_7 }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ServiceTags;
}());
exports.serviceTags = new ServiceTags();

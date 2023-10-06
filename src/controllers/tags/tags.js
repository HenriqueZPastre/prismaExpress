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
exports.ControllerTags = void 0;
var HandleResponse_1 = require("../../utils/HandleResponse/HandleResponse");
var zod_1 = require("zod");
var erroGenerico_1 = require("../../utils/HandleResponse/erroGenerico");
var serviceTags_1 = require("../../services/tags/serviceTags");
var client_1 = require("@prisma/client");
var tags_1 = require("@models/tags/tags");
var validateObject_1 = require("../../utils/zodValidate/validateObject");
var prisma = new client_1.PrismaClient();
exports.ControllerTags = {
    listar: function (req, resp) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, consulta, erro, validar, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, serviceTags_1.serviceTags.listarTodas(req.query)];
                    case 1:
                        _a = _b.sent(), consulta = _a.consulta, erro = _a.erro;
                        if (erro) {
                            return [2 /*return*/, HandleResponse_1.HandleResponse.main(resp, 400, { erro: 'Erro ao listar tags', data: erro })];
                        }
                        return [4 /*yield*/, zod_1.z.array(tags_1.zodTag.listar).safeParse(consulta)];
                    case 2:
                        validar = _b.sent();
                        if (consulta != null && consulta.length < 1) {
                            return [2 /*return*/, HandleResponse_1.HandleResponse.main(resp, 404, { mensagem: 'Nenhum resultado encontrado' })];
                        }
                        else {
                            return [2 /*return*/, HandleResponse_1.HandleResponse.main(resp, 200, { data: consulta, zodValidate: validar })];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        if (error_1 instanceof zod_1.ZodError) {
                            return [2 /*return*/, HandleResponse_1.HandleResponse.main(resp, 400, { zod: error_1 })];
                        }
                        return [2 /*return*/, HandleResponse_1.HandleResponse.main(resp, 400, { erro: 'Erro ao listar tags', data: error_1 })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    excluir: function (req, resp) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, qnt, erro, mensagemErro, error, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, serviceTags_1.serviceTags.verificarAsociacoesDeTag(parseInt(req.params.id))];
                    case 1:
                        _a = _b.sent(), qnt = _a.qnt, erro = _a.erro;
                        if (erro) {
                            return [2 /*return*/, HandleResponse_1.HandleResponse.main(resp, 400, { erro: "Tag com id ".concat(req.params.id, " n\u00E3o encontrada"), extras: erro })];
                        }
                        if (!(qnt != null && qnt > 0)) return [3 /*break*/, 2];
                        mensagemErro = "N\u00E3o \u00E9 poss\u00EDvel excluir a tag com ID ".concat(req.params.id, " porque h\u00E1 ").concat(qnt, " lan\u00E7amentos associados a ela.");
                        return [2 /*return*/, HandleResponse_1.HandleResponse.main(resp, 400, { erro: mensagemErro })];
                    case 2: return [4 /*yield*/, serviceTags_1.serviceTags.deletar(parseInt(req.params.id))];
                    case 3:
                        error = (_b.sent()).error;
                        if (error) {
                            return [2 /*return*/, HandleResponse_1.HandleResponse.main(resp, 400, { erro: 'Erro ao deletar tag', extras: error })];
                        }
                        return [2 /*return*/, HandleResponse_1.HandleResponse.main(resp, 204)];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _b.sent();
                        return [2 /*return*/, HandleResponse_1.HandleResponse.main(resp, 400, { erro: 'Erro não mapeado', extras: error_2 })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    criar: function (req, resp) {
        return __awaiter(this, void 0, void 0, function () {
            var validar, resultado, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, validateObject_1.validarZod)(req, resp, tags_1.zodTag.tag)];
                    case 1:
                        validar = _a.sent();
                        if (!validar) return [3 /*break*/, 5];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, serviceTags_1.serviceTags.criar(req.body)];
                    case 3:
                        resultado = (_a.sent()).resultado;
                        return [2 /*return*/, HandleResponse_1.HandleResponse.main(resp, 200, { data: resultado })];
                    case 4:
                        error_3 = _a.sent();
                        if (error_3 instanceof zod_1.ZodError) {
                            console.log(error_3);
                            return [2 /*return*/, HandleResponse_1.HandleResponse.main(resp, 401, { zod: error_3, extras: error_3 })];
                        }
                        return [2 /*return*/, HandleResponse_1.HandleResponse.main(resp, 400, { erro: error_3 })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    editar: function (req, resp) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, existe, erro, resultado, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = parseInt(req.params.id);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        tags_1.zodTag.tag.parse(req.body);
                        return [4 /*yield*/, serviceTags_1.serviceTags.verificarSeTagExiste(parseInt(req.params.id))];
                    case 2:
                        _a = _b.sent(), existe = _a.existe, erro = _a.erro;
                        if (erro) {
                            return [2 /*return*/, HandleResponse_1.HandleResponse.main(resp, 400, { erro: erro, extras: erro })];
                        }
                        if (!!existe) return [3 /*break*/, 3];
                        return [2 /*return*/, HandleResponse_1.HandleResponse.main(resp, 400, { erro: 'Tag não existe' })];
                    case 3: return [4 /*yield*/, serviceTags_1.serviceTags.editar({ id: id, nome: req.body.nome })];
                    case 4:
                        resultado = (_b.sent()).resultado;
                        return [2 /*return*/, HandleResponse_1.HandleResponse.main(resp, 200, { data: resultado })];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_4 = _b.sent();
                        if (error_4 instanceof zod_1.ZodError) {
                            return [2 /*return*/, HandleResponse_1.HandleResponse.main(resp, 400, { zod: error_4, extras: error_4 })];
                        }
                        return [2 /*return*/, HandleResponse_1.HandleResponse.main(resp, 400, { erro: error_4 })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    },
    buscarPorID: function (req, resp) {
        return __awaiter(this, void 0, void 0, function () {
            var resultado, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, serviceTags_1.serviceTags.buscarPorId(parseInt(req.params.id))];
                    case 1:
                        resultado = (_a.sent()).resultado;
                        if (!resultado) {
                            return [2 /*return*/, HandleResponse_1.HandleResponse.main(resp, 404, { erro: 'Tag não encontrada' })];
                        }
                        return [2 /*return*/, HandleResponse_1.HandleResponse.main(resp, 200, { data: resultado })];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, HandleResponse_1.HandleResponse.main(resp, 400, { erro: error_5 })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    verificarSeTagExiste: function (tags) {
        return __awaiter(this, void 0, void 0, function () {
            var existe, existeArrayId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.tags.findMany({
                            select: {
                                id: true,
                            },
                            where: {
                                deletede_at: null,
                                id: {
                                    in: tags
                                }
                            }
                        })];
                    case 1:
                        existe = _a.sent();
                        existeArrayId = Array.from(existe, function (_a) {
                            var id = _a.id;
                            return id;
                        });
                        tags.forEach(function (tag) {
                            if (!existeArrayId.includes(tag)) {
                                throw erroGenerico_1.ErrorGenerico.main("Tag ".concat(tag, " n\u00E3o encontrada"));
                            }
                        });
                        if (existe.length < 1) {
                            throw erroGenerico_1.ErrorGenerico.main('Nenhuma tag informada foi encontrada');
                        }
                        return [2 /*return*/, existe];
                }
            });
        });
    }
};

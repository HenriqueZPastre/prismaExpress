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
exports.Bancos = void 0;
const HandleResponse_1 = require("../../utils/HandleResponse/HandleResponse");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.Bancos = {
    cadastrarBancos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Promise.all(req.body.bancos.map((banco) => __awaiter(this, void 0, void 0, function* () {
                    const t = parseInt(banco.id);
                    const existe = yield prisma.bancos.findUnique({
                        where: {
                            id: t
                        }
                    });
                    if (!existe) {
                        yield prisma.bancos.create({
                            data: {
                                id: t,
                                nome: banco.nome
                            }
                        });
                    }
                })));
                HandleResponse_1.HandleResponse.main(res, 200, { data: 'bancos' });
            }
            catch (err) {
                HandleResponse_1.HandleResponse.main(res, 400, { erro: err });
            }
        });
    },
    listarBancos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bancos = yield prisma.bancos.findMany({
                select: {
                    id: true,
                    nome: true
                },
                where: {
                    deletede_at: null,
                    OR: [
                        { id: parseInt(req.query.search) ? parseInt(req.query.search) : undefined },
                        {
                            nome: {
                                contains: req.query.search ? req.query.search : undefined
                            }
                        },
                    ]
                }
            });
            HandleResponse_1.HandleResponse.main(res, 200, { data: bancos });
            return bancos;
        });
    },
    getId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const banco = yield prisma.bancos.findUnique({
                where: {
                    id: id
                }
            });
            if (!banco) {
                return HandleResponse_1.HandleResponse.main(res, 404, { erro: 'Banco não encontrado' });
            }
            return HandleResponse_1.HandleResponse.main(res, 200, { data: banco });
        });
    }
};

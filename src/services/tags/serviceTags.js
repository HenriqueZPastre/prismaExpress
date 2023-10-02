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
exports.serviceTags = void 0;
const Paginator_1 = require("../../utils/Paginator/Paginator");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ServiceTags {
    listarTodas(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { take, skip, colunaParaOrdenacao, order } = Paginator_1.Paginator.main(params);
                const consulta = yield prisma.tags.findMany({
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
                });
                return { consulta, erro: null };
            }
            catch (error) {
                return { consulta: null, erro: error };
            }
        });
    }
    deletar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.tags.update({
                    data: {
                        deletede_at: new Date()
                    },
                    where: {
                        id: id,
                    }
                });
                return { error: undefined };
            }
            catch (error) {
                return { error: error };
            }
        });
    }
    criar(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tag = yield prisma.tags.create({
                    select: {
                        nome: true,
                        id: true,
                    },
                    data: {
                        nome: params.nome
                    }
                });
                return { resultado: tag, erro: null };
            }
            catch (error) {
                return { resultado: null, erro: error };
            }
        });
    }
    editar(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const update = yield prisma.tags.update({
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
                });
                return { resultado: update, erro: null };
            }
            catch (error) {
                return { resultado: null, erro: error };
            }
        });
    }
    buscarPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tag = yield prisma.tags.findFirst({
                    select: {
                        id: true,
                        nome: true,
                    },
                    where: {
                        id: id,
                        deletede_at: null
                    }
                });
                return { resultado: tag, erro: null };
            }
            catch (error) {
                return { resultado: null, erro: error };
            }
        });
    }
    verificarSeTagExiste(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const numeroDeLancamentos = yield prisma.tags.count({
                    where: {
                        id: id,
                        deletede_at: null
                    }
                });
                return { existe: numeroDeLancamentos > 0 ? true : false, erro: null };
            }
            catch (error) {
                console.error('aaa', error);
                return { existe: null, erro: new Error(String(error)) };
            }
        });
    }
    verificarAsociacoesDeTag(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.tags.findFirstOrThrow({
                    where: {
                        id: id,
                        deletede_at: null
                    }
                });
                const numeroDeLancamentos = yield prisma.lancamentos_tags.count({
                    where: {
                        tagsId: id,
                        deletede_at: null,
                        tags: {
                            deletede_at: null
                        }
                    }
                });
                return { qnt: numeroDeLancamentos, erro: null };
            }
            catch (error) {
                return { qnt: null, erro: error };
            }
        });
    }
}
exports.serviceTags = new ServiceTags();

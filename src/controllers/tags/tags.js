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
exports.ControllerTags = void 0;
const HandleResponse_1 = require("../../utils/HandleResponse/HandleResponse");
const zod_1 = require("zod");
const erroGenerico_1 = require("../../utils/HandleResponse/erroGenerico");
const serviceTags_1 = require("../../services/tags/serviceTags");
const client_1 = require("@prisma/client");
const tags_1 = require("../../models/tags/tags");
const validateObject_1 = require("../../utils/zodValidate/validateObject");
const prisma = new client_1.PrismaClient();
exports.ControllerTags = {
    listar(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { consulta, erro } = yield serviceTags_1.serviceTags.listarTodas(req.query);
                if (erro) {
                    return HandleResponse_1.HandleResponse.main(resp, 400, { erro: 'Erro ao listar tags', data: erro });
                }
                const validar = yield zod_1.z.array(tags_1.zodTag.listar).safeParse(consulta);
                if (consulta != null && consulta.length < 1) {
                    return HandleResponse_1.HandleResponse.main(resp, 404, { mensagem: 'Nenhum resultado encontrado' });
                }
                else {
                    return HandleResponse_1.HandleResponse.main(resp, 200, { data: consulta, zodValidate: validar });
                }
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    return HandleResponse_1.HandleResponse.main(resp, 400, { zod: error });
                }
                return HandleResponse_1.HandleResponse.main(resp, 400, { erro: 'Erro ao listar tags', data: error });
            }
        });
    },
    excluir(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { qnt, erro } = yield serviceTags_1.serviceTags.verificarAsociacoesDeTag(parseInt(req.params.id));
                if (erro) {
                    return HandleResponse_1.HandleResponse.main(resp, 400, { erro: `Tag com id ${req.params.id} não encontrada`, extras: erro });
                }
                if (qnt != null && qnt > 0) {
                    const mensagemErro = `Não é possível excluir a tag com ID ${req.params.id} porque há ${qnt} lançamentos associados a ela.`;
                    return HandleResponse_1.HandleResponse.main(resp, 400, { erro: mensagemErro });
                }
                else {
                    const { error } = yield serviceTags_1.serviceTags.deletar(parseInt(req.params.id));
                    if (error) {
                        return HandleResponse_1.HandleResponse.main(resp, 400, { erro: 'Erro ao deletar tag', extras: error });
                    }
                    return HandleResponse_1.HandleResponse.main(resp, 204);
                }
            }
            catch (error) {
                return HandleResponse_1.HandleResponse.main(resp, 400, { erro: 'Erro não mapeado', extras: error });
            }
        });
    },
    criar(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const validar = yield (0, validateObject_1.validarZod)(req, resp, tags_1.zodTag.tag);
            if (validar) {
                try {
                    const { resultado } = yield serviceTags_1.serviceTags.criar(req.body);
                    return HandleResponse_1.HandleResponse.main(resp, 200, { data: resultado });
                }
                catch (error) {
                    if (error instanceof zod_1.ZodError) {
                        console.log(error);
                        return HandleResponse_1.HandleResponse.main(resp, 401, { zod: error, extras: error });
                    }
                    return HandleResponse_1.HandleResponse.main(resp, 400, { erro: error });
                }
            }
        });
    },
    editar(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                tags_1.zodTag.tag.parse(req.body);
                const { existe, erro } = yield serviceTags_1.serviceTags.verificarSeTagExiste(parseInt(req.params.id));
                if (erro) {
                    return HandleResponse_1.HandleResponse.main(resp, 400, { erro: erro, extras: erro });
                }
                if (!existe) {
                    return HandleResponse_1.HandleResponse.main(resp, 400, { erro: 'Tag não existe' });
                }
                else {
                    const { resultado } = yield serviceTags_1.serviceTags.editar({ id, nome: req.body.nome });
                    return HandleResponse_1.HandleResponse.main(resp, 200, { data: resultado });
                }
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    return HandleResponse_1.HandleResponse.main(resp, 400, { zod: error, extras: error });
                }
                return HandleResponse_1.HandleResponse.main(resp, 400, { erro: error });
            }
        });
    },
    buscarPorID(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { resultado } = yield serviceTags_1.serviceTags.buscarPorId(parseInt(req.params.id));
                if (!resultado) {
                    return HandleResponse_1.HandleResponse.main(resp, 404, { erro: 'Tag não encontrada' });
                }
                return HandleResponse_1.HandleResponse.main(resp, 200, { data: resultado });
            }
            catch (error) {
                return HandleResponse_1.HandleResponse.main(resp, 400, { erro: error });
            }
        });
    },
    verificarSeTagExiste(tags) {
        return __awaiter(this, void 0, void 0, function* () {
            const existe = yield prisma.tags.findMany({
                select: {
                    id: true,
                },
                where: {
                    deletede_at: null,
                    id: {
                        in: tags
                    }
                }
            });
            const existeArrayId = Array.from(existe, ({ id }) => id);
            tags.forEach((tag) => {
                if (!existeArrayId.includes(tag)) {
                    throw erroGenerico_1.ErrorGenerico.main(`Tag ${tag} não encontrada`);
                }
            });
            if (existe.length < 1) {
                throw erroGenerico_1.ErrorGenerico.main('Nenhuma tag informada foi encontrada');
            }
            return existe;
        });
    }
};

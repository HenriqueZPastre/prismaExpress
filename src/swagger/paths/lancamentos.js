"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lancamentos = void 0;
const parametros_1 = require("../utils/parametros");
const schemas_1 = require("../schemas");
const lancamentos_1 = require("../../models/lancamentos/lancamentos");
exports.Lancamentos = {
    '/lancamentos': {
        get: {
            tags: [
                'Lancamentos'
            ],
            summary: 'Lista os lancamentos',
            parameters: [
                parametros_1.swaggerutils.queryParams.all,
                parametros_1.swaggerutils.queryParams.order,
                parametros_1.swaggerutils.queryParams.page,
                parametros_1.swaggerutils.queryParams.take,
                parametros_1.swaggerutils.colunas(lancamentos_1.zodLancamentos.responseCreate.shape)
            ],
            responses: {
                '200': {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: (0, schemas_1.refSchema)('listarLancamentos')
                            }
                        }
                    }
                }
            }
        },
        post: {
            tags: [
                'Lancamentos'
            ],
            summary: 'Cria um novo lancamento',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: (0, schemas_1.refSchema)('createLancamentos')
                        }
                    }
                }
            },
            responses: {
                '201': {
                    description: 'Created',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: (0, schemas_1.refSchema)('responseCreateConta')
                            }
                        }
                    }
                }
            }
        },
    },
    '/lancamentos/{id}': {
        get: {
            tags: [
                'Lancamentos'
            ],
            summary: 'Busca um lancamento',
            parameters: [
                parametros_1.swaggerutils.queryParams.id
            ],
            responses: {
                '200': {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: (0, schemas_1.refSchema)('createLancamentos')
                            }
                        }
                    }
                }
            }
        },
        put: {
            tags: [
                'Lancamentos'
            ],
            summary: 'Atualiza um lancamento',
            parameters: [
                parametros_1.swaggerutils.queryParams.id
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: (0, schemas_1.refSchema)('editarLancamentos')
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: (0, schemas_1.refSchema)('createLancamentos')
                            }
                        }
                    }
                }
            }
        },
        delete: {
            tags: [
                'Lancamentos'
            ],
            summary: 'Deleta um lancamento',
            parameters: [
                parametros_1.swaggerutils.queryParams.id
            ],
            responses: {
                '204': {
                    description: 'No Content'
                }
            }
        }
    }
};

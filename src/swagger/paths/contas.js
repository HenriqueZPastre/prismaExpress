"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contas = void 0;
const parametros_1 = require("../utils/parametros");
const schemas_1 = require("../schemas");
exports.contas = {
    '/contas': {
        get: {
            tags: [
                'Contas'
            ],
            summary: 'Lista as contas',
            parameters: [
                parametros_1.swaggerutils.queryParams.page,
                parametros_1.swaggerutils.queryParams.all,
                parametros_1.swaggerutils.queryParams.take,
            ],
            responses: {
                '200': {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: (0, schemas_1.refSchema)('listarContas')
                            }
                        }
                    }
                }
            },
        },
        post: {
            tags: [
                'Contas'
            ],
            summary: ' Insere uma nova conta',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: (0, schemas_1.refSchema)('createContas')
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
        }
    },
    '/contas/{id}': {
        get: {
            tags: [
                'Contas'
            ],
            summary: 'Busca os dados de uma conta',
            parameters: [
                parametros_1.swaggerutils.queryParams.id,
            ],
            responses: {
                '200': {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: (0, schemas_1.refSchema)('getConta')
                            }
                        }
                    }
                }
            },
        },
        put: {
            tags: [
                'Contas'
            ],
            summary: 'Atualiza os dados da conta indicada',
            parameters: [
                parametros_1.swaggerutils.queryParams.id,
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: (0, schemas_1.refSchema)('editarContas')
                        }
                    }
                }
            },
            responses: {
                '204': {
                    description: 'No Content',
                }
            }
        },
        delete: {
            tags: [
                'Contas'
            ],
            summary: 'Soft delete da conta',
            parameters: [
                parametros_1.swaggerutils.queryParams.id,
            ],
            responses: {
                '204': {
                    description: 'No Content',
                }
            }
        },
    }
};

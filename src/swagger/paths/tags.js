"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tags = void 0;
const parametros_1 = require("../utils/parametros");
const schemas_1 = require("../schemas");
exports.tags = {
    '/tags': {
        get: {
            tags: [
                'Tags'
            ],
            summary: 'Lista as tags',
            parameters: [
                parametros_1.swaggerutils.queryParams.all,
                parametros_1.swaggerutils.queryParams.take,
                parametros_1.swaggerutils.queryParams.page,
            ],
            responses: {
                '200': {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: (0, schemas_1.refSchema)('listarTags')
                            }
                        }
                    }
                }
            }
        },
        post: {
            tags: [
                'Tags'
            ],
            summary: ' Insere uma nova tag',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: (0, schemas_1.refSchema)('createTags')
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
                                $ref: (0, schemas_1.refSchema)('responseCreateTag')
                            }
                        }
                    }
                }
            }
        }
    },
    '/tags/{id}': {
        get: {
            tags: [
                'Tags'
            ],
            summary: 'Busca os dados da tag',
            parameters: [
                parametros_1.swaggerutils.queryParams.id
            ],
            responses: {
                '200': {
                    description: 'OK',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: (0, schemas_1.refSchema)('responseCreateTag')
                            }
                        }
                    }
                }
            }
        },
        put: {
            tags: [
                'Tags'
            ],
            summary: 'Atualiza os dados da tag',
            parameters: [
                parametros_1.swaggerutils.queryParams.id
            ],
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: (0, schemas_1.refSchema)('editarTags')
                        }
                    }
                }
            },
            responses: {
                '200': {
                    description: 'OK',
                }
            }
        },
        delete: {
            tags: [
                'Tags'
            ],
            summary: 'Soft delete da tag',
            parameters: [
                parametros_1.swaggerutils.queryParams.id
            ],
            responses: {
                '200': {
                    description: 'OK',
                }
            }
        }
    },
};

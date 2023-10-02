"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerutils = exports.colunas = exports.queryParams = void 0;
exports.queryParams = {
    id: {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
            type: 'integer'
        },
        description: 'Id do registro',
    },
    page: {
        name: 'page',
        in: 'path',
        required: true,
        schema: {
            type: 'integer',
        },
        description: 'Página atual desejada, se for undefined pega a pagina 1'
    },
    all: {
        name: 'all',
        in: 'path',
        schema: {
            type: 'boolean'
        },
        description: 'Se for true, retorna todos os registros.'
    },
    take: {
        name: 'take',
        in: 'path',
        schema: {
            type: 'integer'
        },
        description: 'Quantidade de registros por página (default 15)'
    },
    order: {
        name: 'order',
        in: 'path',
        schema: {
            type: 'string'
        },
        examples: {
            desc: {},
            asc: {}
        },
        description: `Ordenação dos registros: <br>
		order = desc | asc	
		`
    }
};
const colunas = (objeto) => {
    const keys = Object.keys(objeto);
    return {
        name: 'coluna',
        in: 'path',
        schema: {
            type: 'string',
            enum: keys
        },
        description: 'Colunas para ordenação dos registros'
    };
};
exports.colunas = colunas;
exports.swaggerutils = __importStar(require("./parametros"));

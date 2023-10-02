"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelsSwaggerTag = void 0;
const zod_openapi_1 = require("@anatine/zod-openapi");
const tags_1 = require("./tags");
const zod_1 = require("zod");
exports.ModelsSwaggerTag = {
    create: (0, zod_openapi_1.generateSchema)(tags_1.zodTag.tag),
    responseCreateTag: (0, zod_openapi_1.generateSchema)(tags_1.zodTag.listar),
    responseListarTags: (0, zod_openapi_1.generateSchema)(zod_1.z.array(tags_1.zodTag.listar)),
    editar: (0, zod_openapi_1.generateSchema)(tags_1.zodTag.tag),
    responseGetTag: (0, zod_openapi_1.generateSchema)(tags_1.zodTag.listar),
};

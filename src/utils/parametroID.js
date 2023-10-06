"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParametroID = exports.ZodParametroID = void 0;
var zod_1 = require("zod");
exports.ZodParametroID = zod_1.z.object({
    id: zod_1.z.string().trim()
});
exports.ParametroID = require("./parametroID");

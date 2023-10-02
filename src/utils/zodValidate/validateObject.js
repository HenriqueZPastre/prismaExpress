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
exports.validarZod = void 0;
const HandleResponse_1 = require("../../utils/HandleResponse/HandleResponse");
/**
 *
 * @param request request da api
 * @param res response da api
 * @param objetoZod objeto zod validador
 * @returns True se sucesso e False se falhar
 */
const validarZod = (request, res, objetoZod) => __awaiter(void 0, void 0, void 0, function* () {
    const validar = yield objetoZod.safeParse(request.body);
    if (validar.success === false) {
        HandleResponse_1.HandleResponse.main(res, 400, { zodValidate: validar });
        return false;
    }
    return true;
});
exports.validarZod = validarZod;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleResponse = void 0;
const zod_1 = require("zod");
function ZodValidarResponse(obj) {
    var _a;
    return ((_a = obj === null || obj === void 0 ? void 0 : obj.zodValidate) === null || _a === void 0 ? void 0 : _a.success) === false ? obj === null || obj === void 0 ? void 0 : obj.zodValidate : undefined;
}
function ZodTratarMensagemDeErro(obj) {
    var _a, _b;
    if ((obj === null || obj === void 0 ? void 0 : obj.zod) !== undefined && (obj === null || obj === void 0 ? void 0 : obj.zod) instanceof zod_1.ZodError) {
        obj.zod = `${(_a = obj === null || obj === void 0 ? void 0 : obj.zod) === null || _a === void 0 ? void 0 : _a.issues[0].path[0]} ${(_b = obj === null || obj === void 0 ? void 0 : obj.zod) === null || _b === void 0 ? void 0 : _b.issues[0].message.toLowerCase()}`;
    }
    return obj === null || obj === void 0 ? void 0 : obj.zod;
}
function MontarDadosDoResponse(obj) {
    const { data, erro, extras, mensagem, paginas, registros } = obj;
    const zodErrorMessage = ZodTratarMensagemDeErro(obj);
    const zodValidateResponse = ZodValidarResponse(obj);
    return {
        data,
        mensagem,
        erro,
        zod: zodErrorMessage,
        zodValidate: zodValidateResponse,
        extras,
        registros,
        paginas,
    };
}
exports.HandleResponse = {
    main: (response, statusCode, obj = {}) => {
        if (obj) {
            const PossiveisDadosDeRespostaObject = MontarDadosDoResponse(obj);
            return response.status(statusCode).json(PossiveisDadosDeRespostaObject);
        }
        return response.status(statusCode).json();
    }
};

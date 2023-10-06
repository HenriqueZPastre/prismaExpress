"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleResponse = void 0;
var zod_1 = require("zod");
function ZodValidarResponse(obj) {
    var _a;
    return ((_a = obj === null || obj === void 0 ? void 0 : obj.zodValidate) === null || _a === void 0 ? void 0 : _a.success) === false ? obj === null || obj === void 0 ? void 0 : obj.zodValidate : undefined;
}
function ZodTratarMensagemDeErro(obj) {
    var _a, _b;
    if ((obj === null || obj === void 0 ? void 0 : obj.zod) !== undefined && (obj === null || obj === void 0 ? void 0 : obj.zod) instanceof zod_1.ZodError) {
        obj.zod = "".concat((_a = obj === null || obj === void 0 ? void 0 : obj.zod) === null || _a === void 0 ? void 0 : _a.issues[0].path[0], " ").concat((_b = obj === null || obj === void 0 ? void 0 : obj.zod) === null || _b === void 0 ? void 0 : _b.issues[0].message.toLowerCase());
    }
    return obj === null || obj === void 0 ? void 0 : obj.zod;
}
function MontarDadosDoResponse(obj) {
    var data = obj.data, erro = obj.erro, extras = obj.extras, mensagem = obj.mensagem, paginas = obj.paginas, registros = obj.registros;
    var zodErrorMessage = ZodTratarMensagemDeErro(obj);
    var zodValidateResponse = ZodValidarResponse(obj);
    return {
        data: data,
        mensagem: mensagem,
        erro: erro,
        zod: zodErrorMessage,
        zodValidate: zodValidateResponse,
        extras: extras,
        registros: registros,
        paginas: paginas,
    };
}
exports.HandleResponse = {
    main: function (response, statusCode, obj) {
        if (obj === void 0) { obj = {}; }
        if (obj) {
            var PossiveisDadosDeRespostaObject = MontarDadosDoResponse(obj);
            return response.status(statusCode).json(PossiveisDadosDeRespostaObject);
        }
        return response.status(statusCode).json();
    }
};
